import { Plugin } from "vite";
import { remove_console_from_levels } from "@hw-rust/remove-console-core";

export type RemoveConsoleLevels = "log" | "warn" | "info" | "error";
export type RemoveConsolePluginOptions = {
  removeLevels?: RemoveConsoleLevels[];
};

export interface RemoveConsolePlugin {
  (): Plugin;
  (options?: RemoveConsolePluginOptions): Plugin;
}

const removeConsolePlugin: RemoveConsolePlugin = (...args) => {
  let removeLevels = ["log"];
  if (args[0] && (args[0] as RemoveConsolePluginOptions)["removeLevels"]) {
    removeLevels = (args[0] as RemoveConsolePluginOptions)["removeLevels"];
  }

  console.log(`\nRemove console code - [target: ${removeLevels.join(", ")}]\n`);
  return <Plugin>{
    name: "vite-remove-console",
    enforce: "post",
    apply: "build",
    transform: async (source, id) => {
      if (/node_modules/.test(id) || /vite\.config\.[mc]?[tj]s$/.test(id)) {
        return {
          code: source,
          map: null,
        };
      }
      const filteredCode = remove_console_from_levels(source, removeLevels);
      return {
        code: filteredCode,
        map: null,
      };
    },
  };
};

export default removeConsolePlugin;
