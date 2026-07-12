These files are intentionally crafted test fixtures for Continuum's scanner.

- `fake-payload.js` deliberately mimics the "hidden payload after 200+ spaces" obfuscation shape used by real-world supply-chain malware (e.g. the Lazarus Group "Contagious Interview" campaign, which hides payloads in `postcss.config.mjs`/`webpack.config.js` files). The content after the spaces is a harmless `console.log` — there is no real malicious code in this file. It exists purely so the scanner's detection logic can be tested against a known-positive sample.
- `clean-file.js` is a known-negative sample — ordinary formatting, should never be flagged.
