import CodeBlock from "./CodeBlock";

export default class Display {
  private fileNameString: string = "";
  private typeStrings: string[] = [];
  private declarationStrings: string[] = [];
  private numberOfLinesStrings: string[] = [];

  constructor(fileName: string, blocksToDisplay: CodeBlock[]) {
    this.fileNameString = "File Name: " + fileName;
    blocksToDisplay.forEach(block => this.addCodeBlockDataStrings(block));
  }

  public print(): void {
    this.displayBlocks();
  }

  private addCodeBlockDataStrings(block: CodeBlock) {
    this.typeStrings.push("Type: " + block.getType());
    this.declarationStrings.push("Declaration: " + block.getDeclaration());
    this.numberOfLinesStrings.push("Number of Lines: " + block.getNumberOfLines());
  }

  private displayBlocks() {
    this.printFileNameInBox();
    for (let i = 0; i < this.declarationStrings.length; i++) {
      console.log(this.typeStrings[i]);
      console.log(this.declarationStrings[i]);
      console.log(this.numberOfLinesStrings[i]);
      console.log();
    }
  }

  private printFileNameInBox() {
    console.log(" ".padEnd(this.fileNameString.length + 3, "-"));
    console.log("| " + this.fileNameString + " |");
    console.log(" ".padEnd(this.fileNameString.length + 3, "-"));
  }
}
