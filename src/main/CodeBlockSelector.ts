import CodeBlock from "./CodeBlock";
import { BlockType } from "./BlockType";

export default class CodeBlockSelector {
  private codeBlocks: CodeBlock[];

  constructor(codeBlocks: CodeBlock[]) {
    this.codeBlocks = codeBlocks;
  }

  public withIndentationLevel(level: number): CodeBlockSelector {
    const codeBlocks = this.codeBlocks.filter(block => block.getIndentationLevel() === level);
    return new CodeBlockSelector(codeBlocks);
  }

  public withType(type: BlockType): CodeBlockSelector {
    const codeBlocks = this.codeBlocks.filter(block => block.getType() === type);
    return new CodeBlockSelector(codeBlocks);
  }

  public withLengthMoreThan(numberOfLines: number): CodeBlockSelector {
    const codeBlocks = this.codeBlocks.filter(block => block.getNumberOfLines() > numberOfLines);
    return new CodeBlockSelector(codeBlocks);
  }

  public getBlocks(): CodeBlock[] {
    return this.codeBlocks;
  }
}
