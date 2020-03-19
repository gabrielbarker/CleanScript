import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import LimitSelector from "./LimitSelector";

export default class InvalidSelector {
  private readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private limitSelector: LimitSelector;

  constructor(limitSelector: LimitSelector) {
    const configData = readFileSync(this.CONFIG_PATH).toString();
    this.analyzerConfig = JSON.parse(configData);
    this.limitSelector = limitSelector;
  }

  public getBlocksOverLimit(codeBlocks: CodeBlock[]): CodeBlock[] {
    return this.limitSelector.getInvalidBlocks(this.analyzerConfig, codeBlocks);
  }
}
