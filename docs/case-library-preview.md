# Private Case Files library

EXE-119 / ENG-844 / ENG-828. Reuses verified content-engine episode and clip
manifests, the actual website shell, local fonts and theme. No new dependencies,
public route, navigation edit or production build behavior.

```sh
node scripts/build-case-library.cjs REQUEST.json dist-case-preview
npm run serve:case-preview
node scripts/verify-case-library.cjs REQUEST.json
```

The ordinary `dist/` must already exist. The builder only creates the dedicated
`dist-case-preview/` and refuses replacement. A failed build leaves a failure
record; inspect it before explicitly removing only that generated preview.
The source request has `schemaVersion: 1` and `episodes`, each containing an
absolute `packageFile` and optional absolute `clips` manifest paths.

Every episode requires verified fictional-data disclosure and unchanged source
evidence. Clips must match that exact parent package. Film, captions, script and
clips are copied and hash-checked. An English WebVTT track is derived from the
existing SRT. The downloadable evidence file retains source IDs, file hashes and
actual pending reviews, without exposing local source paths. The same IDs remain
available to the existing publishing adapters; library entries are not posts.

Open http://127.0.0.1:3011/case-files/. Robots and response headers say noindex;
there is no production canonical, publication date or customer-case claim.
This loopback preview is not a deployment or permanent hosting service.

20 November checks: both existing films and two technical clips; twelve real
HTTP downloads matched hashes; four desktop/mobile/light/dark browser checks
played actual video for 1.2 seconds each, with no overflow, script errors or
external requests. Duplicate episodes, mismatched clip parent and overwrite
were rejected. All 75 existing production files remained unchanged.

Evidence: private `cosimo-content/case-library/verification/`. Short playback
checks do not establish full audio, creative or factual acceptance. The films
and clips retain their existing review status. Public library acceptance still
requires reviewed episodes and actual publication.
