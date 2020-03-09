import CodeBlock from "./CodeBlock";

export default class FileData {
  private fileName: string;
  private codeBlocks: CodeBlock[];

  constructor(fileName: string, codeBlocks: CodeBlock[]) {
    this.fileName = this.extractFileName(fileName);
    this.codeBlocks = codeBlocks;
  }

  public getFileName(): string {
    return this.fileName;
  }

  public getCodeBlocks(): CodeBlock[] {
    return this.codeBlocks;
  }

  private extractFileName(rawName: string) {
    const firstDot = rawName.lastIndexOf(".");
    const lastSlash = rawName.lastIndexOf("/");
    const start = lastSlash === -1 ? 0 : lastSlash;
    const end = firstDot === -1 ? rawName.length : firstDot;
    return rawName.substring(start + 1, end);
  }
}
