import CodeBlock from "./CodeBlock";
import LimitSelector from "./LimitSelector";

export default class KindLimitSelector implements LimitSelector {
  private kindLimits: any;

  constructor(config: any) {
    this.kindLimits = config["type limits"];
  }

  public getBlocks(blocks: CodeBlock[]): CodeBlock[] {
    const kind = blocks[0].kind;
    return blocks.length > this.kindLimits[kind] ? blocks : [];
  }
}
