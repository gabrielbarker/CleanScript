import BlockTypeAnalyzer from "./BlockTypeAnalyzer";
import CodeBlock from "./CodeBlock";

export default class CodeBlockFactory {
  private fileText: string;
  private blockTypeAnalyzer: BlockTypeAnalyzer;
  private indentation: number;
  private lineNumber: number;

  constructor(fileText: string, blockTypeAnalyzer: BlockTypeAnalyzer) {
    this.fileText = fileText;
    this.blockTypeAnalyzer = blockTypeAnalyzer;
    this.indentation = 0;
    this.lineNumber = 1;
  }

  public getBlock(openCurlyBracketIndex: number, lastIndex: number): CodeBlock {
    return new CodeBlock(
      this.fileText,
      this.blockTypeAnalyzer,
      openCurlyBracketIndex,
      lastIndex,
      this.indentation,
      this.lineNumber
    );
  }

  public increaseLineNumber(): void {
    this.lineNumber++;
  }

  public increaseIndentation(): void {
    this.indentation++;
  }

  public decreaseIndentation(): void {
    this.indentation--;
  }
}
