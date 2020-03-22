import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitSelector from "./LimitSelector";

export default class LineLimitSelector implements LimitSelector {
  private readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private limits: any;

  constructor() {
    this.limits = JSON.parse(readFileSync(this.CONFIG_PATH).toString())["line limits"];
  }

  public getBlocks(blocksOfSameKind: CodeBlock[]): any[] {
    const kind = blocksOfSameKind[0].kind;
    const blockSelector = new CodeBlockSelector(blocksOfSameKind);
    return blockSelector.withNumberOfLinesMoreThan(this.limits[kind]).getBlocks();
  }
}
