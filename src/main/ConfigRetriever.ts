import { readFileSync, existsSync } from "fs";
import { safeLoad } from "js-yaml";

export default class ConfigRetriever {
  private static readonly CONFIG_PATH = "./analyzer.yml";

  public getConfig() {
    if (this.configFileExists()) return this.getActualConfig();
    return this.getDefaultConfig();
  }

  private configFileExists(): boolean {
    return existsSync(ConfigRetriever.CONFIG_PATH);
  }

  private getActualConfig(): any {
    const configText = readFileSync(ConfigRetriever.CONFIG_PATH).toString();
    try {
      return safeLoad(configText);
    } catch (error) {
      console.log(error);
    }
  }

  private getDefaultConfig(): any {
    return {
      line_limits: {
        function: 8,
        class: 100,
        loop: 8,
        if: 8,
        interface: 10
      },
      type_limits: {
        function: 15,
        class: 2,
        loop: 4,
        if: 4,
        interface: 3
      }
    };
  }
}
