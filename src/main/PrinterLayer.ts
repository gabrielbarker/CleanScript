import Taybl from "taybl";
import CodeBlock from "../main/CodeBlock";
import Cleanliness from "./Cleanliness";

export default class PrinterLayer {
  private static readonly LINE_VALID_MESSAGE = "\nNone of these files violate the line limits!";
  private static readonly TYPE_VALID_MESSAGE = "\nNone of these files violate the type limits!";

  private config: any;
  private blocks: CodeBlock[];
  private lineData: any;
  private kindData: any;

  constructor(config: any, lineData: any, kindData: any, blocks: CodeBlock[]) {
    this.config = config;
    this.blocks = blocks;
    this.lineData = lineData;
    this.kindData = kindData;
  }

  public print() {
    this.printLineLimitsTable();
    this.printKindLimitsTable();
    this.printCleanlinessReport();
  }

  private printLineLimitsTable() {
    if (!this.lineData.files.length) console.log(PrinterLayer.LINE_VALID_MESSAGE);
    else {
      console.log("\nLINE LIMITS:");
      this.printTaybl(this.lineData);
    }
  }

  private printKindLimitsTable() {
    if (!this.kindData.files.length) console.log(PrinterLayer.TYPE_VALID_MESSAGE);
    else {
      console.log("\nTYPE LIMITS:");
      this.printTaybl(this.kindData);
    }
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
