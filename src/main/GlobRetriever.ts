import { lstatSync, existsSync } from "fs";

export default class GlobRetriever {
  public static getGlob(globOrPath: string) {
    if (this.isDirectory(globOrPath)) return this.getGlobFromDirectory(globOrPath);
    return globOrPath;
  }

  private static isDirectory(globOrPath: string): boolean {
    return existsSync(globOrPath) && lstatSync(globOrPath).isDirectory();
  }

  private static getGlobFromDirectory(globOrPath: string): string {
    return globOrPath + (globOrPath.endsWith("/") ? "**/*@(.ts|.js)" : "/**/*@(.ts|.js)");
  }
}
