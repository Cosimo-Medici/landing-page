#!/usr/bin/env python3
"""Local single-tier arithmetic adapter for ENG-856. Uses the existing lesson calc.

Accepts explicitly fictional structured examples, not customer documents or free-text
terms. No term approval, distribution approval or full-waterfall verification is implied.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys
from decimal import Decimal, InvalidOperation

REPO = Path(__file__).resolve().parents[2] / "cosimo"
LESSON = REPO / "packs/shared/lessons/compute-distribution-waterfall"
CALC = REPO / "agent/calc"
sys.path.insert(0, str(LESSON))
import _wf_lib as lib

FIELDS = ("amount_to_lp", "amount_to_gp", "remaining_pool")


def check(request):
    if not isinstance(request, dict) or set(request) != {"schemaVersion", "kind", "sourceReference", "inputs", "claimedResult"}:
        raise ValueError("Expected schemaVersion, kind, sourceReference, inputs and claimedResult only")
    if request["schemaVersion"] != 1 or request["kind"] != "fictional_example":
        raise ValueError("This local adapter accepts fictional_example only")
    if not isinstance(request["sourceReference"], str) or not request["sourceReference"].strip():
        raise ValueError("Name the source of the fictional example")
    inputs, claimed = request["inputs"], request["claimedResult"]
    if not isinstance(inputs, dict) or not isinstance(claimed, dict) or set(claimed) != set(FIELDS):
        raise ValueError("Claim all three result amounts: amount_to_lp, amount_to_gp, remaining_pool")
    contract_path = CALC / "calculate-european-waterfall-tier/contract.json"
    contract = json.loads(contract_path.read_text())
    allowed = {row["path"] for row in contract["inputs"]}
    if set(inputs) - allowed:
        raise ValueError("Unknown calculation inputs")
    if type(inputs.get("tier")) is not int or inputs["tier"] not in (1, 2, 3, 4):
        raise ValueError("tier must be 1, 2, 3 or 4")
    for key, value in claimed.items():
        if not isinstance(value, str):
            raise ValueError(f"{key} must be an exact decimal string")
        number = Decimal(value)
        if not number.is_finite() or number < 0 or number != number.quantize(Decimal("0.01")):
            raise ValueError(f"{key} must be a finite nonnegative cent amount")
    envelope = lib.run_calc("calculate-european-waterfall-tier", "calculate_tier.py", inputs, calc_root=CALC)
    lib.require_result(envelope, *FIELDS, calc_name="single-tier arithmetic")
    comparisons = [{"field": key, "claimed": claimed[key], "calculated": envelope["result"][key],
                    "matches": Decimal(claimed[key]) == Decimal(envelope["result"][key])} for key in FIELDS]
    sources = [contract_path, CALC / "calculate-european-waterfall-tier/scripts/calculate_tier.py", LESSON / "_wf_lib.py", CALC / "_lib/waterfall_lib.py"]
    return {"schemaVersion": 1, "kind": "waterfall_tier_arithmetic_check", "inputKind": "fictional_example",
            "status": "arithmetic_matches" if all(row["matches"] for row in comparisons) else "arithmetic_mismatch",
            "scope": "One structured tier only; no clause interpretation, capital-state reconciliation, approval or full-waterfall verification.",
            "sourceReference": request["sourceReference"], "inputs": inputs, "comparisons": comparisons,
            "envelope": envelope, "sources": [{"path": str(p), "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in sources]}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("request", type=Path)
    ap.add_argument("output", type=Path)
    args = ap.parse_args()
    os.umask(0o077)
    private = Path.home() / "Library/Application Support/cosimo-content"
    output = args.output.resolve()
    if not output.is_relative_to(private.resolve()) or output.exists():
        raise ValueError("Use a new output file inside the private cosimo-content directory")
    raw = args.request.read_bytes()
    if len(raw) > 100000:
        raise ValueError("Request exceeds 100 KB")
    result = check(json.loads(raw))
    result["requestSha256"] = hashlib.sha256(raw).hexdigest()
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("x") as file:
        json.dump(result, file, indent=2)
    print(json.dumps({"status": result["status"], "output": str(output)}))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, InvalidOperation, lib.BuildError) as error:
        sys.exit(str(error))
