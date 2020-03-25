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
import ArrayFlattener from "./ArrayFlattener";

export default class Analyzer {
  private config: any;
  private paths: string[] = [];
  private blocks: CodeBlock[] = [];

  constructor(globOrPath: string) {
    this.config = new ConfigRetriever().getConfig();
    this.paths = this.getPaths(globOrPath);
    if (!this.paths.length) return;
    this.filterPaths();
    this.getBlocksFromPaths();
  }

  public print() {
    if (!this.paths.length)
      return console.log("There are no TypeScript or JavaScript files in this directory");
    else this.printData();
  }

  private getPaths(globOrPath: string): string[] {
    const pathRetriever = new FilePathRetriever();
    return pathRetriever.getFilePaths(globOrPath);
  }

  private filterPaths() {
    const globsToIgnore: string[] = this.config.ignore;
    if (!globsToIgnore || !globsToIgnore.length) return;
    const nestedPathsToIgnore = globsToIgnore.map(glob => this.getPaths(glob));
    const pathsToIgnore = ArrayFlattener.flatten(nestedPathsToIgnore);
    this.paths = this.paths.filter(path => !pathsToIgnore.includes(path));
  }

  private getBlocksFromPaths() {
    const astRetriever = new ASTRetriever();
    const allBlocks = this.paths.map(path => {
      const ast = astRetriever.getAST(path);
      return new CodeBlockRetriever(ast).getBlocks();
    });
    this.blocks = ArrayFlattener.flatten(allBlocks);
  }

  private printData() {
    const lineData = this.getLineData();
    const kindData = this.getKindData();
    this.printTables(lineData, kindData);
  }

  private printTables(lineData: any, kindData: any) {
    console.log("\nLINE LIMITS:");
    this.printTaybl(lineData);
    console.log("\nTYPE LIMITS:");
    this.printTaybl(kindData);
  }

  private getLineData() {
    return new DataCreator(
      this.blocks,
      new LineLimitSelector(this.config),
      new LineLimitSubObjectCreator()
    ).getTayblData();
  }

  private getKindData() {
    return new DataCreator(
      this.blocks,
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
