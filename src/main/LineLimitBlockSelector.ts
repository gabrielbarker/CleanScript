import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitBlockSelector from "./LimitBlockSelector";

export default class LineLimitBlockSelector implements LimitBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[] = [];
  private blocksOverLimit: CodeBlock[] = [];

  constructor() {
    const configData = readFileSync(LineLimitBlockSelector.CONFIG_PATH).toString();
    this.codeBlocks = [];
    this.analyzerConfig = JSON.parse(configData);
  }

  public getBlocksOverLimit(codeBlocks: CodeBlock[]): CodeBlock[] {
    this.codeBlocks = codeBlocks;
    this.findBlocksOverLineLimit();
    return this.blocksOverLimit;
  }

  private findBlocksOverLineLimit(): void {
    const limits: any = this.analyzerConfig["lineLimit"];
    const blockTypes: string[] = Object.keys(limits);
    this.blocksOverLimit = this.getBlocksOverLineLimitForTypes(blockTypes);
  }

  private getBlocksOverLineLimitForTypes(blockTypes: string[]): CodeBlock[] {
    const blocks = blockTypes.map(type => this.getBlocksOverLineLimitOfType(type));
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOverLineLimitOfType(blockType: string): CodeBlock[] {
    const limit: number = this.analyzerConfig["lineLimit"][blockType];
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector
      .withLengthMoreThan(limit)
      .withType(blockType)
      .getBlocks();
  }
}
