import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import LimitSelector from "./LimitSelector";

export default class KindLimitSelector implements LimitSelector {
  private kindLimits: any;

  constructor() {
    this.kindLimits = JSON.parse(
      readFileSync("/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json").toString()
    )["type limits"];
  }

  public getBlocks(blocks: CodeBlock[]): any[] {
    const kind = blocks[0].kind;
    return blocks.length > this.kindLimits[kind] ? blocks : [];
  }
}
