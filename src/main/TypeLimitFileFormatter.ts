import FileData from "./FileData";
import CodeBlock from "./CodeBlock";

export type TypeTableData = { Type: string; Count: number };
export type FileTableData = { "File Name": string; invalid: TypeTableData[] };

export default class TypeLimitFileFormatter {
  private fileData: FileData;
  private typeTable: any = {};
  private typeTableData: TypeTableData[] = [];

  constructor(fileData: FileData) {
    this.fileData = fileData;
    this.getTypeTable();
    this.typeTableData = this.getTypeTableData();
  }

  public getFileTableData(): FileTableData {
    return { "File Name": this.fileData.getFileName(), invalid: this.typeTableData };
  }

  private getTypeTable(): void {
    this.fileData.getCodeBlocks().forEach(block => this.updateTypeTable(block));
  }

  private updateTypeTable(block: CodeBlock): void {
    if (!this.typeTable[block.getType()]) this.typeTable[block.getType()] = { count: 0 };
    this.typeTable[block.getType()].count++;
  }

  private getTypeTableData(): TypeTableData[] {
    return Object.keys(this.typeTable).map(type => this.getTypeTableObject(type));
  }

  private getTypeTableObject(type: string): TypeTableData {
    return { Type: type, Count: this.typeTable[type].count };
  }
}
