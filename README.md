# Continuum

A local, open-source CLI that scans a project's source files for hidden malicious payloads — the kind smuggled into build/config files (`postcss.config.mjs`, `webpack.config.js`, etc.) that silently execute on every `dev`/`build`.

This project exists because of a real incident: a supply-chain malware pattern (linked to the Lazarus Group "Contagious Interview" campaign) was found hidden in a `postcss.config.mjs` file — legitimate code, followed by 200+ blank spaces, followed by an obfuscated payload that ran on every build. Continuum's first detector targets exactly that shape.

## Why local, not a hosted service

Continuum runs entirely on your machine. Your source code is never uploaded anywhere. For a security tool, that's not a preference — it's the whole point: a tool that asks you to trust it with your code is asking you to recreate the exact risk it claims to defend against.

## Usage

```
npx continuum <path-to-scan>
```

Example:
```
npx continuum .
```

## What it currently detects

- **Obfuscated payloads hidden behind long runs of whitespace** — 200+ consecutive spaces followed by real content, on a single line. This is the specific camouflage technique used to hide malicious code off-screen in editors.

Automatically skipped:
- `node_modules`, `.git`, `.next`, `.vercel` folders
- Binary files (detected via null-byte sniffing, not extension guessing)

## Status

Early — `v0.1`. Built incrementally, in the open, while learning. More detection signatures (npm `postinstall`/`preinstall` hook abuse, known C2 indicators) and CI/git-hook integration are planned.

## License

MIT
