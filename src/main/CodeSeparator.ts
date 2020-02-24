import CodeBlock from "./CodeBlock";
import CodeBlockFactory from "./CodeBlockFactory";
import DefaultBlockTypeAnalyzer from "./DefaultBlockTypeAnalyzer";
export default class CodeSeparator {
  private fileText: string = "";
  private codeBlocks: CodeBlock[] = [];
  private startIndices: number[] = [];
  private codeBlockFactory: CodeBlockFactory;

  constructor(fileText: string) {
    this.fileText = fileText;
    this.codeBlockFactory = new CodeBlockFactory(fileText, new DefaultBlockTypeAnalyzer());
    this.findAllCodeBlocks();
  }

  public getCodeBlocks(): CodeBlock[] {
    return this.codeBlocks;
  }

  private findAllCodeBlocks(): void {
    let indentation: number = 0;

    this.fileText.split("").forEach((character, index) => {
      if (character === "{") {
        this.handleIndentationIncrease(index, indentation);
        indentation++;
      } else if (character === "}") {
        indentation--;
        this.handleIndentationDecrease(index, indentation);
      }
    });
  }

  private handleIndentationIncrease(index: number, indentation: number) {
    this.codeBlockFactory.increaseIndentation();
    this.startIndices.push(index);
  }

  private handleIndentationDecrease(index: number, indentation: number) {
    this.codeBlockFactory.decreaseIndentation();
    const block = this.codeBlockFactory.getBlock(this.startIndices[indentation], index);
    this.codeBlocks.push(block);
    this.startIndices.pop();
  }
}
