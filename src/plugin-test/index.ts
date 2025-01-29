import { PluginOption } from "vite";
import getFilteredCodeFromWA from "./getResultFromWA";

export type LogLevels = "log" | "info" | "warn" | "error";

type RemoveConsolePluginArgs = {
  logLevels: LogLevels[];
};

const removeConsole = (args: RemoveConsolePluginArgs): PluginOption => {
  return {
    name: "hw-rui:remove-console-plugin-test",
    apply: "build",
    enforce: "post",
    transform: async (source, id) => {
      if (/node_modules/.test(id)) {
        return {
          code: source,
          map: null,
        };
      }
      try {
        const removedConsoleCode = (await getFilteredCodeFromWA(
          source,
          args.logLevels
        )) as string;
        return {
          code: removedConsoleCode,
          map: null,
        };
      } catch (err) {
        console.error(err);
        return {
          code: source,
          map: null,
        };
      }
    },
  };
};

export default removeConsole;
