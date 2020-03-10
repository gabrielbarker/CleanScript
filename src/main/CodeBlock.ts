import BlockTypeAnalyzer from "./BlockTypeAnalyzer";
import { BlockType } from "./BlockType";

export default class CodeBlock {
  private fileText: string;
  private openCurlyBracketIndex: number;
  private firstIndex: number = this.openCurlyBracketIndex;
  private lastIndex: number;
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
    this.blockType = blockTypeAnalyzer.typeOf(this);
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
    return this.block.split("").filter(character => character === "\n").length + 1;
  }

  public getDeclaration(): string {
    return this.fileText.substring(this.firstIndex, this.openCurlyBracketIndex).trim();
  }

  private findWholeBlock(): void {
    this.findFirstIndex();
    this.block = this.fileText.substring(this.firstIndex, this.lastIndex + 1).trim();
  }

  private findFirstIndex(): void {
    let declarationStart = (this.fileText.lastIndexOf("\n", this.openCurlyBracketIndex) + 1) | 0;
    if (this.isMultipleLineDeclaration(declarationStart)) {
      const openBracketIndex = this.fileText.lastIndexOf("(", this.openCurlyBracketIndex);
      declarationStart = this.fileText.lastIndexOf("\n", openBracketIndex);
    }
    this.firstIndex = declarationStart;
  }

  private isMultipleLineDeclaration(declarationStart: number): boolean {
    const declaration = this.fileText.substring(declarationStart, this.openCurlyBracketIndex);
    return declaration.includes(")") && !declaration.includes("(");
  }
}
