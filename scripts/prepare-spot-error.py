#!/usr/bin/env python3
"""Prepare a fictional arithmetic exercise from an existing independently derived vector."""
import hashlib
import json
import os
from pathlib import Path
import sys

REPO = Path(__file__).resolve().parents[2] / "cosimo"
LESSON = REPO / "packs/shared/lessons/compute-distribution-waterfall"
sys.path.insert(0, str(LESSON))
import _wf_lib as lib


def prepare():
    vector = REPO / "agent/tests/calc/vectors/prepare-statement-of-changes-partners-capital.json"
    case = json.loads(vector.read_text())["cases"][0]
    envelope = lib.run_calc("prepare-statement-of-changes-partners-capital", "build_capital_account.py", case["input"], calc_root=REPO / "agent/calc")
    for key, expected in case["expect_result"].items():
        value = envelope["result"]
        for part in key.split("."):
            value = value[part]
        if value != expected:
            raise ValueError(f"Existing capital calc does not match independent vector: {key}")
    labels = {"beginning_capital":"Beginning capital", "total_contributions":"Contributions", "distributions_non_recallable":"Non-recallable distributions", "distributions_recallable":"Recallable distributions", "total_distributions":"Total distributions", "net_investment_income":"Net investment income", "realized_gain":"Realized gain", "unrealized_loss":"Unrealized loss", "management_fee":"Management fee", "carried_interest":"Carried interest", "net_increase_from_operations":"Net increase from operations", "ending_capital":"Ending capital", "unfunded_roll_forward.unfunded_beginning":"Beginning unfunded commitment", "unfunded_roll_forward.less_contributions":"Less contributions", "unfunded_roll_forward.plus_recallable_restorations":"Recallable restorations", "unfunded_roll_forward.unfunded_ending":"Ending unfunded commitment"}
    # Deliberately one incorrect displayed figure. Expected amounts are the
    # pre-existing hand-derived vector, independently checked against the calc.
    rows = [{"field": key, "label": labels[key], "amount": "5480000.00" if key == "ending_capital" else value, "expectedAmount": value} for key, value in case["expect_result"].items()]
    assert sum(row["amount"] != row["expectedAmount"] for row in rows) == 1
    challenge = {"schemaVersion":1,"kind":"fictional_technical_exercise","challengeId":"capital-rollforward-fixture-v1","status":"local_preview_only",
                 "period":{"start":case["input"]["period_start"],"end":case["input"]["period_end"]},"rows":rows,
                 "source":{"vectorName":vector.name,"caseName":case["name"],"sha256":hashlib.sha256(vector.read_bytes()).hexdigest()},
                 "answer":{"field":"ending_capital","amount":"5470000.00","explanation":case["derivation"]},
                 "measurement":{"submissions":None,"solveRate":None,"publicMonthStartedAt":None}}
    return challenge, {"inputs":case["input"],"envelope":envelope,"independentExpected":case["expect_result"],"sourcePath":str(vector),"sourceSha256":challenge["source"]["sha256"],"assertedExpectedFields":len(case["expect_result"]),"plantedDifferences":1}


if __name__ == "__main__":
    os.umask(0o077)
    if len(sys.argv) != 2:
        sys.exit("Usage: prepare-spot-error.py /new/private/output-directory")
    output = Path(sys.argv[1]).resolve()
    private = (Path.home() / "Library/Application Support/cosimo-content").resolve()
    if not output.is_relative_to(private) or output.exists():
        sys.exit("Use a new output directory inside private cosimo-content")
    challenge, evidence = prepare()
    output.mkdir(parents=True)
    (output / "challenge.json").write_text(json.dumps(challenge, indent=2))
    (output / "calculation-evidence.json").write_text(json.dumps(evidence, indent=2))
    print(json.dumps({"challenge":str(output / "challenge.json"),"expectedFieldsChecked":evidence["assertedExpectedFields"],"plantedDifferences":1}))
