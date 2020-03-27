import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

export default class Cleanliness {
  private totalNumberOfBlocks: number = 0;
  private lineCount: number = 0;
  private kindCount: number = 0;

  constructor(allBlocks: CodeBlock[], lineData: any, kindData: any) {
    this.totalNumberOfBlocks = this.getTotalNumberOfBlocks(allBlocks);
    if (lineData.files.length) this.lineCount = this.reduceByCount(lineData);
    if (kindData.files.length) this.kindCount = this.reduceByCount(kindData);
  }

  public report() {
    const linePercentage = this.calculatePercentageFor(this.lineCount);
    const kindPercentage = this.calculatePercentageFor(this.kindCount);
    const totalPercentage = this.calculateTotalPercentageFor(linePercentage, kindPercentage);
    this.printFigures(linePercentage, kindPercentage, totalPercentage);
  }

  private getTotalNumberOfBlocks(blocks: CodeBlock[]) {
    return blocks.length - new CodeBlockSelector(blocks).withKind("other").getBlocks().length;
  }

  private reduceByCount(obj: any) {
    const sum = (sum: number, n: number) => sum + n;
    const toCount = (x: any) => x.count;
    return obj.files.map((fileObj: any) => fileObj.invalid.map(toCount).reduce(sum)).reduce(sum);
  }

  private printFigures(linePercentage: number, kindPercentage: number, totalPercentage: number) {
    if (this.lineCount || this.kindCount) console.log("\nCLEANLINESS:");
    if (this.lineCount) console.log(`Line Limits - ${linePercentage}%`);
    if (this.kindCount) console.log(`Type Limits - ${kindPercentage}%`);
    if (this.lineCount && this.kindCount) console.log(`Total       - ${totalPercentage}%`);
    console.log();
  }

  private calculatePercentageFor(count: number) {
    return Math.ceil(10000 * (1 - count / this.totalNumberOfBlocks)) / 100;
  }

  private calculateTotalPercentageFor(percentA: number, percentB: number) {
    return Math.ceil(100 * ((percentA + percentB) / 2)) / 100;
  }
}
