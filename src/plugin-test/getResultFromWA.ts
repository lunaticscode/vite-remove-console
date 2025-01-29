import { exec } from "node:child_process";
import { cwd } from "node:process";
import { resolve as pathResolve } from "node:path";
import { LogLevels } from ".";
const coreFilePath = pathResolve(
  cwd(),
  "src",
  "plugin-test",
  "remove-console-core"
);

const getFilteredCodeFromWA = async (
  code: string,
  levels: LogLevels[] = ["log"]
) =>
  await new Promise((resolve) => {
    exec(`${coreFilePath} ${code} ${levels}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        resolve(code);
      }
      if (stderr) {
        console.log(stderr);
        resolve(code);
      }
      if (stdout) {
        console.log(stdout.trim());
        resolve(stdout.trim());
      }
    });
  });

export default getFilteredCodeFromWA;
