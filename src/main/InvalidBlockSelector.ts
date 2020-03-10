import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import { BlockType } from "./BlockType";

export default class InvalidBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];

  constructor(codeBlocks: CodeBlock[]) {
    this.analyzerConfig = JSON.parse(readFileSync(InvalidBlockSelector.CONFIG_PATH).toString());
    this.codeBlocks = codeBlocks;
  }

  public getBlocksOverLineLimitOfType(blockType: BlockType): CodeBlock[] {
    const limit: number = this.analyzerConfig["lineLimit"][blockType];
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector
      .withLengthMoreThan(limit)
      .withType(blockType)
      .getBlocks();
  }
}
