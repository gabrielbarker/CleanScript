import CodeBlock from "./CodeBlock";

export default class CodeBlockSelector {
  private blocks: CodeBlock[] = [];

  constructor(blocks: CodeBlock[]) {
    this.blocks = blocks;
  }

  public getBlocks(): CodeBlock[] {
    return this.blocks;
  }

  public withKind(...kind: string[]): CodeBlockSelector {
    const blocks = this.blocks.filter(block => kind.includes(block.kind));
    return new CodeBlockSelector(blocks);
  }

  public withFileName(name: string): CodeBlockSelector {
    const blocks = this.blocks.filter(block => block.fileName === name);
    return new CodeBlockSelector(blocks);
  }

  public withNumberOfLinesMoreThan(limit: number): CodeBlockSelector {
    const blocks = this.blocks.filter(block => block.numberOfLines > limit);
    return new CodeBlockSelector(blocks);
  }
}
