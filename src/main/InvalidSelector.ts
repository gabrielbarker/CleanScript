import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import LimitBlockSelector from "./LimitBlockSelector";

export default class InvalidSelector {
  private readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];
  private blocksOverLimit: CodeBlock[] = [];
  private limitBlockSelector: LimitBlockSelector;

  constructor(limitBlockSelector: LimitBlockSelector) {
    const configData = readFileSync(this.CONFIG_PATH).toString();
    this.codeBlocks = [];
    this.analyzerConfig = JSON.parse(configData);
    this.limitBlockSelector = limitBlockSelector;
  }

  public getBlocksOverLimit(codeBlocks: CodeBlock[]): CodeBlock[] {
    this.codeBlocks = codeBlocks;
    this.findBlocksOverTypeLimit();
    return this.blocksOverLimit;
  }

  private findBlocksOverTypeLimit(): void {
    this.blocksOverLimit = this.limitBlockSelector.getInvalidBlocks(
      this.analyzerConfig,
      this.codeBlocks
    );
  }
}
