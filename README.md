# :wrench: Vite Remove Console Plugin

`vite-remove-console` is a Vite plugin designed to help you clean up console statements (e.g., `console.log`, `console.warn`) from your code during the build process. It ensures that your production build is free from unnecessary console statements, improving both security and performance.

## :file_folder: NPM Package

https://www.npmjs.com/package/vite-remove-console

## Features

- Removes specified `console` methods (e.g., `log`, `info`, `warn`, `error`) during the build phase.
- Targets only non-`node_modules` files to preserve library functionality.
- Easy to configure with custom log levels.
- **Uses [`@hw-rust/remove-console-core`](https://www.npmjs.com/package/@hw-rust/remove-console-core), a Rust-based WebAssembly (WASM) package, for efficient console string removal.**

## Installation

To install the plugin, run:

```bash
npm install -D vite-remove-console
```

or

```bash
yarn add -D vite-remove-console
```

or

```bash
pnpm add -D vite-remove-console
```

## Usage

To use the plugin, import it and add it to your Vite configuration file (`vite.config.ts` or `vite.config.js`):

### Example Configuration

```typescript
import { defineConfig } from "vite";
import removeConsole from "vite-remove-console";

export default defineConfig({
  plugins: [
    removeConsole(), // Default remove target is only "log".
  ],
});
```

```typescript
export default defineConfig({
  plugins: [
    removeConsole({
      removeLevels: ["log", "info", "warn", "error"], // Specify the console methods to remove.
    }),
  ],
});
```

### Options

| Option         | Type          | Default | Description                                                               |
| -------------- | ------------- | ------- | ------------------------------------------------------------------------- |
| `removeLevels` | `LogLevels[]` | `[log]` | Array of console levels to remove (e.g., `log`, `info`, `warn`, `error`). |

## How It Works

1. The plugin scans the source code during the Vite build process.
2. It utilizes [`@hw-rust/remove-console-core`](https://www.npmjs.com/package/@hw-rust/remove-console-core), a **Rust-based WebAssembly package**, to efficiently match and remove specified `console` statements from non-`node_modules` files.
3. The resulting production build is free of the targeted `console` statements.

## Example

Given the following code in your development environment:

```javascript
console.log("Debug message");
console.error("Error message");
```

With the configuration `removeLevels: ['log']`, the resulting production build will look like:

```javascript
console.error("Error message");
```

## License

This plugin is licensed under the [MIT License](./LICENSE).

## Contributing

Contributions are welcome! If you have suggestions or find issues, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/lunaticscode/vite-remove-console).

## Author

- lunatics384@gmail.com
- https://www.linkedin.com/in/insoo-park-437496138/
