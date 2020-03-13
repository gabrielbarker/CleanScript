import CodeBlock from "./CodeBlock";

export default class Display {
  private fileNameString: string = "";
  private detailsBlocks: string[] = [];

  constructor(fileName: string, blocksToDisplay: CodeBlock[]) {
    this.fileNameString = fileName;
    blocksToDisplay.forEach(block => this.addCodeBlockDataStrings(block));
  }

  public printInvalidBlocks(): void {
    if (this.detailsBlocks.length) this.displayBlocks();
  }

  private addCodeBlockDataStrings(block: CodeBlock) {
    let detailsString = "Type: " + block.getType();
    detailsString += "\nDeclaration: " + block.getDeclaration();
    detailsString += "\nLines: " + block.getLineNumber();
    detailsString += "\nNumber of Lines: " + block.getNumberOfLines() + "\n";
    this.detailsBlocks.push(detailsString);
  }

  private displayBlocks() {
    this.printFileNameInBox();
    this.detailsBlocks.forEach(block => console.log(block));
  }

  private printFileNameInBox() {
    console.log(" ".padEnd(this.fileNameString.length + 3, "-"));
    console.log("| " + this.fileNameString + " |");
    console.log(" ".padEnd(this.fileNameString.length + 3, "-"));
  }
}
