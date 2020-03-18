import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

export default class TypeLimitBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];
  private blocksOverLimit: CodeBlock[] = [];

  constructor(codeBlocks: CodeBlock[]) {
    const configData = readFileSync(TypeLimitBlockSelector.CONFIG_PATH).toString();
    this.analyzerConfig = JSON.parse(configData);
    this.codeBlocks = codeBlocks;
    this.findBlocksOverTypeLimit();
  }

  public getBlocksOverTypeLimit(): CodeBlock[] {
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
