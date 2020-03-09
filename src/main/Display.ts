import FileData from "./FileData";
import CodeBlock from "./CodeBlock";

export default class Display {
  private maxWidth: number = 0;

  private fileNameString: string = "";
  private typeStrings: string[] = [];
  private declarationStrings: string[] = [];
  private numberOfLinesStrings: string[] = [];

  constructor(fileName: string, blocksToDisplay: CodeBlock[]) {
    this.fileNameString = this.getFileNameString(fileName);
    blocksToDisplay.forEach(block => this.addCodeBlockDataStrings(block));
  }

  public print(): void {
    this.displayFileData();
  }

  private addCodeBlockDataStrings(block: CodeBlock) {
    this.typeStrings.push(this.getTypeString(block));
    this.declarationStrings.push(this.getDeclarationString(block));
    this.numberOfLinesStrings.push(this.getNumberOfLinesString(block));
  }

  private getFileNameString(name: string) {
    const nameString = "File Name: " + name;
    this.updateMaxWidth(nameString);
    return nameString;
  }

  private getTypeString(block: CodeBlock) {
    const typeString = "Type: " + block.getType();
    this.updateMaxWidth(typeString);
    return typeString;
  }

  private getDeclarationString(block: CodeBlock) {
    const declarationString = "Declaration: " + block.getDeclaration();
    this.updateMaxWidth(declarationString);
    return declarationString;
  }

  private getNumberOfLinesString(block: CodeBlock) {
    const numberOfLinesString = "Number of Lines: " + block.getNumberOfLines();
    this.updateMaxWidth(numberOfLinesString);
    return numberOfLinesString;
  }

  private displayFileData() {
    console.log(this.rowOfHyphens());
    console.log(this.fileNameString);
    for (let i = 0; i < this.declarationStrings.length; i++) {
      console.log();
      console.log(this.typeStrings[i]);
      console.log(this.declarationStrings[i]);
      console.log(this.numberOfLinesStrings[i]);
    }
    console.log();
    console.log(this.rowOfHyphens());
  }

  private updateMaxWidth(stringToCheck: string): void {
    if (stringToCheck.includes("\n")) return;
    if (stringToCheck.length > this.maxWidth) this.maxWidth = stringToCheck.length;
  }

  private rowOfHyphens(): string {
    return " ".padEnd(this.maxWidth + 2, "-");
  }
}
