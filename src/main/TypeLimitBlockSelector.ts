import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitBlockSelector from "./LimitBlockSelector";

export default class TypeLimitBlockSelector implements LimitBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];
  private blocksOverLimit: CodeBlock[] = [];

  constructor() {
    const configData = readFileSync(TypeLimitBlockSelector.CONFIG_PATH).toString();
    this.analyzerConfig = JSON.parse(configData);
    this.codeBlocks = [];
  }

  public getBlocksOverLimit(codeBlocks: CodeBlock[]): CodeBlock[] {
    this.codeBlocks = codeBlocks;
    this.findBlocksOverTypeLimit();
    return this.blocksOverLimit;
  }

  private findBlocksOverTypeLimit(): void {
    const limits: any = this.analyzerConfig["typeLimit"];
    const blockTypes: string[] = Object.keys(limits);
    this.blocksOverLimit = this.getBlocksOverTypeLimitForTypes(blockTypes);
  }

  private getBlocksOverTypeLimitForTypes(blockTypes: string[]): CodeBlock[] {
    const blocks = blockTypes
      .map(type => {
        const limit: number = this.analyzerConfig["typeLimit"][type];
        const blocksOfType = this.getBlocksOfType(type);
        if (blocksOfType.length > limit) return blocksOfType;
      })
      .filter(blocks => blocks !== undefined);
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOfType(blockType: string): CodeBlock[] {
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector.withType(blockType).getBlocks();
  }
}
