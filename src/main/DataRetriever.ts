import CodeSeparator from "./CodeSeparator";
import fs, { readdirSync, lstatSync } from "fs";
import FileData from "./FileData";

export default class DataRetriever {
  private fileData: FileData[] = [];

  constructor(path: string) {
    this.getDataFromPath(path);
  }

  public getFileData() {
    return this.fileData;
  }

  private getDataFromPath(path: string) {
    const fileStats = lstatSync(path);
    if (fileStats.isFile()) this.getDataFromFile(path);
    else if (fileStats.isDirectory()) this.getDataFromDirectory(path);
  }

  private getDataFromDirectory(path: string): void {
    path = this.endWithSlash(path);
    const fileNames = readdirSync(path);
    fileNames.forEach(fileName => this.getDataFromPath(path + fileName));
  }

  private getDataFromFile(path: string): void {
    const fileText = fs.readFileSync(path).toString();
    const codeSeparator = new CodeSeparator(fileText);
    const blocks = codeSeparator.getCodeBlocks();
    this.fileData.push(new FileData(path, blocks));
  }

  private endWithSlash(path: string) {
    if (!path.endsWith("/")) return (path += "/");
    return path;
  }
}
