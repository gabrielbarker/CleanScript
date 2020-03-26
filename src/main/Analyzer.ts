import Taybl from "taybl";
import ConfigRetriever from "../main/ConfigRetriever";
import ASTRetriever from "../main/ASTRetriever";
import CodeBlock from "../main/CodeBlock";
import CodeBlockRetriever from "../main/CodeBlockRetriever";
import LimitDataCreator from "../main/LimitDataCreator";
import KindLimitSubObjectCreator from "../main/KindLimitSubObjectCreator";
import LineLimitSubObjectCreator from "../main/LineLimitSubObjectCreator";
import LineLimitSelector from "../main/LineLimitSelector";
import KindLimitSelector from "../main/KindLimitSelector";
import FilePathRetriever from "../main/FilePathRetriever";
import ArrayFlattener from "./ArrayFlattener";
import Cleanliness from "./Cleanliness";

export default class Analyzer {
  private config: any;
  private paths: string[] = [];
  private blocks: CodeBlock[] = [];

  private lineData: any;
  private kindData: any;

  constructor(globOrPath: string) {
    this.config = new ConfigRetriever().getConfig();
    this.paths = this.getPaths(globOrPath);
    if (!this.paths.length) return;
    this.filterPaths();
    this.getBlocksFromPaths();
    this.lineData = this.getLineData();
    this.kindData = this.getKindData();
  }

  public print() {
    if (!this.paths.length)
      return console.log("There are no TypeScript or JavaScript files in this directory");
    else {
      this.printIfConfigured();
      this.printCleanlinessReport();
    }
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

  private printIfConfigured() {
    if (this.config.line_limits && Object.keys(this.config.line_limits).length)
      this.printLineLimitsTable();
    if (this.config.type_limits && Object.keys(this.config.type_limits).length)
      this.printKindLimitsTable();
  }

  private printLineLimitsTable() {
    const congratsMessage = "\nNone of these files violate the line limits!";
    if (!this.lineData.files.length) console.log(congratsMessage);
    else {
      console.log("\nLINE LIMITS:");
      this.printTaybl(this.lineData);
    }
  }

  private printKindLimitsTable() {
    const congratsMessage = "\nNone of these files violate the type limits!";
    if (!this.kindData.files.length) console.log(congratsMessage);
    else {
      console.log("\nTYPE LIMITS:");
      this.printTaybl(this.kindData);
    }
  }

  private getLineData() {
    return new LimitDataCreator(
      this.blocks,
      new LineLimitSelector(this.config),
      new LineLimitSubObjectCreator()
    ).getTayblData();
  }

  private getKindData() {
    return new LimitDataCreator(
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

  private printCleanlinessReport() {
    const cleanliness = new Cleanliness(this.blocks, this.lineData, this.kindData);
    cleanliness.report();
  }
}
