import FileData from "./FileData";
import CodeBlock from "./CodeBlock";

export type TypeTableData = { Type: string; Count: number; "Line Numbers": string };
export type FileTableData = { "File Name": string; invalid: TypeTableData[] };

export default class TableDisplay {
  private tableData: FileTableData[] = [];

  constructor(filesData: FileData[]) {
    filesData.forEach(fileData => this.addTypeTableData(fileData));
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }

  private addTypeTableData(fileData: FileData): void {
    const typeTableData = TableDisplay.getTypeTableData(fileData);
    if (typeTableData.length)
      this.tableData.push({ "File Name": fileData.getFileName(), invalid: typeTableData });
  }

  private static getTypeTableData(fileData: FileData): TypeTableData[] {
    const codeBlocks = fileData.getCodeBlocks();
    const typeTable: any = TableDisplay.getTypeTableFor(codeBlocks);
    return Object.keys(typeTable).map(type => TableDisplay.getTypeTableObject(type, typeTable));
  }

  private static getTypeTableFor(codeBlocks: CodeBlock[]): any {
    const typeTable: any = {};
    codeBlocks.forEach(block => TableDisplay.updateTypeTable(block, typeTable));
    return typeTable;
  }

  private static updateTypeTable(block: CodeBlock, typeTable: any): void {
    if (!typeTable[block.getType()])
      typeTable[block.getType()] = { count: 0, "line numbers list": [] };
    typeTable[block.getType()].count++;
    typeTable[block.getType()]["line numbers list"].push(block.getLineNumber());
  }

  private static getTypeTableObject(type: string, typeTable: any): TypeTableData {
    return {
      Type: type,
      Count: typeTable[type].count,
      "Line Numbers": TableDisplay.getSortedLineNumbers(type, typeTable).join(" ,")
    };
  }

  private static getSortedLineNumbers(type: string, typeTable: any): number[] {
    return typeTable[type]["line numbers list"].sort((a: number, b: number) => a - b);
  }
}
