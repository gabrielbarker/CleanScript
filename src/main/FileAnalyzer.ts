import CodeSeparator from "./CodeSeparator";
import fs, { readdirSync } from "fs";
import FileData from "./FileData";

export default class FileAnalyzer {
  public static getBlocksFromDirectory(path: string): FileData[] {
    const fileNames = readdirSync(path);
    return fileNames.map(name => this.getBlocksFromFile(path + name));
  }

  public static getBlocksFromFile(path: string): FileData {
    const fileText = fs.readFileSync(path).toString();
    const codeSeparator = new CodeSeparator(fileText);
    const blocks = codeSeparator.getCodeBlocks();
    return new FileData(path, blocks);
  }
}
