import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

export default class LineLimitSelector {
  private kindLimits: any;
  private blocks: CodeBlock[] = [];
  private invalidBlocks: CodeBlock[][] = [];

  constructor(blocks: CodeBlock[]) {
    this.kindLimits = JSON.parse(readFileSync("../../analyzer.json").toString())["typeLimit"];
    this.blocks = blocks;
  }

  public getBlocks() {
    const blockSelector = new CodeBlockSelector(this.blocks);
    this.invalidBlocks = Object.keys(this.kindLimits).map(kind => {
      const blocksOfKind = blockSelector.withKind(kind).getBlocks();
      return blocksOfKind.length > this.kindLimits[kind] ? blocksOfKind : [];
    });
    return Array.prototype.concat.apply([], this.invalidBlocks);
  }
}
