import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

export default class LineLimitSelector {
  private lineLimits: any;
  private blocks: CodeBlock[] = [];
  private invalidBlocks: CodeBlock[][] = [];

  constructor(blocks: CodeBlock[]) {
    this.lineLimits = JSON.parse(readFileSync("../../analyzer.json").toString())["lineLimit"];
    this.blocks = blocks;
  }

  public getBlocks() {
    const blockSelector = new CodeBlockSelector(this.blocks);
    this.invalidBlocks = Object.keys(this.lineLimits).map(kind =>
      blockSelector
        .withKind(kind)
        .withNumberOfLinesMoreThan(this.lineLimits[kind])
        .getBlocks()
    );
    return Array.prototype.concat.apply([], this.invalidBlocks);
  }
}
