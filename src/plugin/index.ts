import { PluginOption } from "vite";

type LogLevels = "log" | "info" | "warn" | "error";
type RemoveConsolePluginArgs = {
  logLevels: LogLevels[];
};
const removeConsole = (args: RemoveConsolePluginArgs): PluginOption => {
  return {
    name: "hw-rui:remove-console-plugin",
    apply: "build",
    enforce: "post",
    transform: (source, id) => {
      if (/node_modules/.test(id)) {
        return {
          code: source,
          map: null,
        };
      }
      const removeTargetLevels = args.logLevels;
      const pattern = new RegExp(
        `console\\.(${removeTargetLevels.join("|")})\\(.*?\\);\\s*`,
        "g"
      );
      const removedConsoleCode = source.replace(pattern, "");
      return {
        code: removedConsoleCode,
        map: null,
      };
    },
  };
};

export default removeConsole;
