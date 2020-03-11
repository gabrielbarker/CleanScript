import CodeBlock from "./CodeBlock";
import CodeBlockFactory from "./CodeBlockFactory";
import DefaultBlockTypeAnalyzer from "./DefaultBlockTypeAnalyzer";
export default class CodeSeparator {
  private codeBlocks: CodeBlock[] = [];
  private startIndices: number[] = [];
  private codeBlockFactory: CodeBlockFactory;
  private currentIndentation: number = 0;

  constructor(fileText: string) {
    this.codeBlockFactory = new CodeBlockFactory(fileText, new DefaultBlockTypeAnalyzer());
    this.findAllCodeBlocks(fileText);
  }

  public getCodeBlocks(): CodeBlock[] {
    return this.codeBlocks;
  }

  private findAllCodeBlocks(fileText: string): void {
    fileText.split("").forEach((character, index) => this.handleBlockChange(character, index));
  }

  private handleBlockChange(character: string, index: number) {
    if (character === "{") this.handleIndentationIncrease(index);
    else if (character === "}") this.handleIndentationDecrease(index);
  }

  private handleIndentationIncrease(index: number) {
    this.codeBlockFactory.increaseIndentation();
    this.startIndices.push(index);
    this.currentIndentation++;
  }

  private handleIndentationDecrease(index: number) {
    this.currentIndentation--;
    this.codeBlockFactory.decreaseIndentation();
    const startOfBlock: number = this.startIndices[this.currentIndentation];
    const block: CodeBlock = this.codeBlockFactory.getBlock(startOfBlock, index);
    this.codeBlocks.push(block);
    this.startIndices.pop();
  }
}
