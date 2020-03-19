import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitSelector from "./LimitSelector";

export default class TypeLimitSelector implements LimitSelector {
  private codeBlocks: CodeBlock[] = [];
  private configSection: any = {};

  public getInvalidBlocks(config: any, codeBlocks: CodeBlock[]): CodeBlock[] {
    this.codeBlocks = codeBlocks;
    this.configSection = config["typeLimit"];
    return this.getBlocksOverTypeLimit();
  }

  private getBlocksOverTypeLimit(): CodeBlock[] {
    const blocks = Object.keys(this.configSection)
      .map(type => this.getBlocksOfTypeIfOverLimit(type))
      .filter(blocks => blocks.length !== 0);
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOfTypeIfOverLimit(blockType: string): CodeBlock[] {
    const limit: number = this.configSection[blockType];
    const blocksOfType = this.getBlocksOfType(blockType);
    if (blocksOfType.length > limit) return blocksOfType;
    return [];
  }

  private getBlocksOfType(blockType: string): CodeBlock[] {
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector.withType(blockType).getBlocks();
  }
}
