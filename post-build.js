import path from "node:path";
import { cwd } from "node:process";
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

const BUILD_DIR = "build";
const DIST_DIR = "dist";
const buildPath = path.resolve(cwd(), BUILD_DIR);
const distPath = path.resolve(cwd(), DIST_DIR);

const createBasePackageJson = () => {
  const basePackageJson = {
    version: "0.0.0",
    name: "vite-remove-console",
    main: "./index.js",
    types: "./types/index.d.ts",
    description:
      "Removes specified `console` methods (e.g., `log`, `info`, `warn`, `error`)",
    keywords: ["vite-plugin", "vite", "console", "remove console"],
    repository: {
      type: "git",
      url: "https://github.com/lunaticscode/vite-remove-console",
    },
    author: {
      name: "Insoo Park",
      email: "lunatics384@gmail.com",
      url: "https://www.linkedin.com/in/insoo-park-437496138/",
    },
    license: "MIT",
    devDependencies: {
      "@hw-rust/remove-console-core": "^0.1.0",
    },
  };
  writeFileSync(
    `${path.join(distPath, "package.json")}`,
    JSON.stringify(basePackageJson)
  );
};

const exec = () => {
  // Copy ${BUILD_DIR}/asset files to ${DIST_DIR} directory;
  try {
    mkdirSync(distPath);

    copyFileSync(`${buildPath}/asset.js`, `${distPath}/index.js`);
    copyFileSync(`${buildPath}/asset.cjs`, `${distPath}/index.cjs`);
    copyFileSync(`${buildPath}/asset.d.ts`, `${distPath}/index.d.ts`);

    rmSync(`${buildPath}/asset.js`);
    rmSync(`${buildPath}/asset.cjs`);
    rmSync(`${buildPath}/asset.d.ts`);
  } catch (err) {
    console.error("");
    console.error(err);
  } finally {
    createBasePackageJson();
  }
};

exec();
