import { sync } from "glob";
import GlobRetriever from "./GlobRetriever";
import { existsSync } from "fs";

export default class FilePathRetriever {
  public getFilePaths(globOrPath: string): string[] {
    const glob = existsSync(globOrPath) ? GlobRetriever.getGlob(globOrPath) : globOrPath;
    const paths = this.getFilePathsFromGlob(glob);
    return paths;
  }

  private getFilePathsFromGlob(glob: string): string[] {
    const options = { absolute: true };
    return sync(glob, options);
  }
}
