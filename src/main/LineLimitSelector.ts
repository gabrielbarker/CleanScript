import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitSelector from "./LimitSelector";

export default class LineLimitSelector implements LimitSelector {
  private codeBlocks: CodeBlock[] = [];
  private configSection: any = {};

  public getInvalidBlocks(config: any, codeBlocks: CodeBlock[]): CodeBlock[] {
    this.codeBlocks = codeBlocks;
    this.configSection = config["lineLimit"];
    return this.getBlocksOverLineLimit();
  }

  private getBlocksOverLineLimit(): CodeBlock[] {
    const blockTypes = Object.keys(this.configSection);
    const blocks = blockTypes.map(type => this.getBlocksOverLineLimitOfType(type));
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOverLineLimitOfType(blockType: string): CodeBlock[] {
    const limit: number = this.configSection[blockType];
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector
      .withLengthMoreThan(limit)
      .withType(blockType)
      .getBlocks();
  }
}
