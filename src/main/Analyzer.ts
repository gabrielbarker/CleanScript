import Taybl from "taybl";
import ConfigRetriever from "../main/ConfigRetriever";
import ASTRetriever from "../main/ASTRetriever";
import CodeBlock from "../main/CodeBlock";
import CodeBlockRetriever from "../main/CodeBlockRetriever";
import DataCreator from "../main/LimitDataCreator";
import KindLimitSubObjectCreator from "../main/KindLimitSubObjectCreator";
import LineLimitSubObjectCreator from "../main/LineLimitSubObjectCreator";
import LineLimitSelector from "../main/LineLimitSelector";
import KindLimitSelector from "../main/KindLimitSelector";
import FilePathRetriever from "../main/FilePathRetriever";

export default class Analyzer {
  private config: any;

  constructor() {
    this.config = new ConfigRetriever().getConfig();
  }

  public analyze(glob: string) {
    const blocks = this.getBlocksFrom(glob);
    const lineData = this.getLineData(blocks);
    const kindData = this.getKindData(blocks);
    this.printTables(lineData, kindData);
  }

  private printTables(lineData: any, kindData: any) {
    console.log("\nLINE LIMITS:");
    this.printTaybl(lineData);
    console.log("\nTYPE LIMITS:");
    this.printTaybl(kindData);
  }

  private getBlocksFrom(glob: string) {
    const pathRetriever = new FilePathRetriever();
    const paths = pathRetriever.getFilePaths(glob);
    return this.getBlocksFromPaths(paths);
  }

  private getBlocksFromPaths(paths: string[]) {
    const astRetriever = new ASTRetriever();
    const allBlocks = paths.map(path => {
      const ast = astRetriever.getAST(path);
      return new CodeBlockRetriever(ast).getBlocks();
    });
    return Array.prototype.concat.apply([], allBlocks);
  }

  private getLineData(blocks: CodeBlock[]) {
    return new DataCreator(
      blocks,
      new LineLimitSelector(this.config),
      new LineLimitSubObjectCreator()
    ).getTayblData();
  }

  private getKindData(blocks: CodeBlock[]) {
    return new DataCreator(
      blocks,
      new KindLimitSelector(this.config),
      new KindLimitSubObjectCreator()
    ).getTayblData();
  }

  private printTaybl(lineData: any) {
    const lineTaybl = new Taybl(lineData);
    lineTaybl
      .withNumberOfSpacesAtStartOfColumns(2)
      .withNumberOfSpacesAtEndOfColumns(2)
      .withHorizontalLineStyle("=")
      .withVerticalLineStyle(":")
      .print();
  }
}
