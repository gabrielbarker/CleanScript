import FileData from "./FileData";
import CodeBlock from "./CodeBlock";
import FileFormatter from "./FileFormatter";

type TypeTableData = { Type: string; Count: number; "Line Numbers": string };
type FileTableData = { "File Name": string; invalid: TypeTableData[] };

export default class LineLimitFileFormatter implements FileFormatter {
  private typeTable: any = {};
  private typeTableData: TypeTableData[] = [];

  public getFileTableData(fileData: FileData): FileTableData {
    this.getTypeTable(fileData);
    this.typeTableData = this.getTypeTableData();
    return { "File Name": fileData.getFileName(), invalid: this.typeTableData };
  }

  private getTypeTable(fileData: FileData): void {
    this.typeTable = {};
    fileData.getCodeBlocks().forEach(block => this.updateTypeTable(block));
  }

  private updateTypeTable(block: CodeBlock): void {
    if (!this.typeTable[block.getType()])
      this.typeTable[block.getType()] = { count: 0, "line numbers list": [] };
    this.typeTable[block.getType()].count++;
    this.typeTable[block.getType()]["line numbers list"].push(block.getLineNumber());
  }

  private getTypeTableData(): TypeTableData[] {
    return Object.keys(this.typeTable).map(type => this.getTypeTableObject(type));
  }

  private getTypeTableObject(type: string): TypeTableData {
    return {
      Type: type,
      Count: this.typeTable[type].count,
      "Line Numbers": this.getSortedLineNumbers(type).join(", ")
    };
  }

  private getSortedLineNumbers(type: string): number[] {
    return this.typeTable[type]["line numbers list"].sort((a: number, b: number) => a - b);
  }
}
