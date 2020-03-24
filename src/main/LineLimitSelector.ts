import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import LimitSelector from "./LimitSelector";

export default class LineLimitSelector implements LimitSelector {
  private limits: any;

  constructor(config: any) {
    this.limits = config.line_limits;
  }

  public getBlocks(blocksOfSameKind: CodeBlock[]): CodeBlock[] {
    const kind = blocksOfSameKind[0].kind;
    const blockSelector = new CodeBlockSelector(blocksOfSameKind);
    return blockSelector.withNumberOfLinesMoreThan(this.limits[kind]).getBlocks();
  }
}
