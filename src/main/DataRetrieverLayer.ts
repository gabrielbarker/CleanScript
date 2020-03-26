import CodeBlock from "./CodeBlock";
import LimitDataCreator from "./LimitDataCreator";
import LineLimitSelector from "./LineLimitSelector";
import LineLimitSubObjectCreator from "./LineLimitSubObjectCreator";
import KindLimitSelector from "./KindLimitSelector";
import KindLimitSubObjectCreator from "./KindLimitSubObjectCreator";

export default class DataRetrieverLayer {
  private blocks: CodeBlock[] = [];
  private config: any;

  private lineData: any;
  private kindData: any;

  constructor(blocks: CodeBlock[], config: any) {
    this.blocks = blocks;
    this.config = config;
    this.lineData = this.constructLineData();
    this.kindData = this.constructKindData();
  }

  public getLineData(): any {
    return this.lineData;
  }

  public getKindData(): any {
    return this.kindData;
  }

  private constructLineData(): any {
    return new LimitDataCreator(
      this.blocks,
      new LineLimitSelector(this.config),
      new LineLimitSubObjectCreator()
    ).getTayblData();
  }

  private constructKindData(): any {
    return new LimitDataCreator(
      this.blocks,
      new KindLimitSelector(this.config),
      new KindLimitSubObjectCreator()
    ).getTayblData();
  }
}
