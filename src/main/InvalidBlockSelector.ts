import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import { BlockType, blockTypeOf } from "./BlockType";

export default class InvalidBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];

  constructor(codeBlocks: CodeBlock[]) {
    this.analyzerConfig = JSON.parse(readFileSync(InvalidBlockSelector.CONFIG_PATH).toString());
    this.codeBlocks = codeBlocks;
  }

  public getBlocksOverLineLimit(): CodeBlock[] {
    const limits: any = this.analyzerConfig["lineLimit"];
    const blockTypes: BlockType[] = Object.keys(limits).map(type => blockTypeOf(type));
    return this.getBlocksOverLineLimitForTypes(blockTypes);
  }

  private getBlocksOverLineLimitForTypes(blockTypes: BlockType[]): CodeBlock[] {
    const blocks = blockTypes.map(type => this.getBlocksOverLineLimitOfType(type));
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOverLineLimitOfType(blockType: BlockType): CodeBlock[] {
    const limit: number = this.analyzerConfig["lineLimit"][blockType];
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector
      .withLengthMoreThan(limit)
      .withType(blockType)
      .getBlocks();
  }
}
