# Testing Strategy
<!-- Cluster: Support & Infrastructure -->

Epoch 8800 uses Jest with the `ts-jest` preset to execute TypeScript tests without a
manual compilation step.

The Codex sandbox lacks internet access, so packages from npm cannot be installed during
CI runs. However, the environment does include a global `node` and `tsc` binary.  No
global `ts-node` module is available.

## Evaluated Approaches

1. **Local TypeScript API** – The original build script used `require('typescript')`.
   Without the package this fails. Installing via npm is blocked.
2. **In‑process `ts-node`** – Also unavailable because the module cannot be installed.
3. **Global `tsc` Binary** – Accessible in the sandbox and does not require network
   access.  We can compile all TypeScript sources to JavaScript before running tests.

## Current Workflow

- `npm run build` invokes `tsc --noEmit` to type-check the project.
- `npm test` runs Jest with the `ts-jest` preset, compiling TypeScript test files on the fly.

This approach avoids missing module errors and keeps the test harness simple.

## Pros
- TypeScript test files execute directly through Jest.
- No custom loaders are needed beyond `ts-jest`.

## Cons
- Type-checking errors may still stop the build.

## Recommendation

Continue using `ts-jest` for test runs and `tsc --noEmit` for type checking to keep
the workflow deterministic in constrained environments.
