import { sync } from "glob";

export default class FilePathRetriever {
  public getFilePaths(glob: string): string[] {
    const options = { absolute: true };
    return sync(glob, options);
  }
}
