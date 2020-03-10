import BlockTypeAnalyzer from "./BlockTypeAnalyzer";
import { BlockType } from "./BlockType";

export default class CodeBlock {
  private fileText: string;
  private openCurlyBracketIndex: number;
  private firstIndex: number = this.openCurlyBracketIndex;
  private lastIndex: number;
  private numberOfLines: number;
  private declaration: string;
  private block: string = "";
  private indentationLevel: number;
  private blockType: BlockType;

  constructor(
    fileText: string,
    blockTypeAnalyzer: BlockTypeAnalyzer,
    openCurlyBracketIndex: number,
    lastIndex: number,
    indentationLevel: number
  ) {
    this.fileText = fileText;
    this.openCurlyBracketIndex = openCurlyBracketIndex;
    this.lastIndex = lastIndex;
    this.indentationLevel = indentationLevel;
    this.findWholeBlock();
    this.declaration = this.findDeclaration();
    this.blockType = blockTypeAnalyzer.typeOf(this);
    this.numberOfLines = this.calculateNumberOfLines();
  }

  public getBlock(): string {
    return this.block;
  }

  public getType(): BlockType {
    return this.blockType;
  }

  public getIndentationLevel(): number {
    return this.indentationLevel;
  }

  public getNumberOfLines(): number {
    return this.numberOfLines;
  }

  public getDeclaration(): string {
    return this.declaration;
  }

  private findDeclaration(): string {
    return this.fileText.substring(this.firstIndex, this.openCurlyBracketIndex).trim();
  }

  private findWholeBlock(): void {
    this.findFirstIndex();
    this.block = this.fileText.substring(this.firstIndex, this.lastIndex + 1).trim();
  }

  private findFirstIndex(): void {
    let declarationStart = (this.fileText.lastIndexOf("\n", this.openCurlyBracketIndex) + 1) | 0;
    if (this.isMultipleLineDeclaration(declarationStart))
      declarationStart = this.getMultilineDeclarationStartIndex();
    this.firstIndex = declarationStart;
  }

  private getMultilineDeclarationStartIndex(): number {
    const openBracketIndex = this.fileText.lastIndexOf("(", this.openCurlyBracketIndex);
    return this.fileText.lastIndexOf("\n", openBracketIndex);
  }

  private isMultipleLineDeclaration(declarationStart: number): boolean {
    const declaration = this.fileText.substring(declarationStart, this.openCurlyBracketIndex);
    return declaration.includes(")") && !declaration.includes("(");
  }

  private calculateNumberOfLines(): number {
    const numberOfLines = this.block.split("").filter(character => character === "\n").length + 1;
    return numberOfLines > 2 ? numberOfLines - 2 : 0;
  }
}
