import FileData from "../FileData";

export type TypeTableData = { type: string; count: number; "line numbers": string };
export type FileTableData = { file: string; invalid: TypeTableData[] };

export default class TableDisplay {
  private tableData: FileTableData[];
  constructor(filesData: FileData[]) {
    const fileDataTable: any[] = [];
    filesData.forEach(fileData =>
      fileDataTable.push({
        file: fileData.getFileName(),
        invalid: this.getTypeObjects(fileData)
      })
    );
    this.tableData = fileDataTable;
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }

  private getTypeObjects(fileData: FileData): TypeTableData[] {
    const codeBlocks = fileData.getCodeBlocks();
    codeBlocks.sort((a, b) => {
      if (a.getType() > b.getType()) return 1;
      if (a.getType() < b.getType()) return -1;
      return 0;
    });
    const objects: TypeTableData[] = [];
    let type = "";
    let lineNumbers: number[] = [];
    let count = 0;
    codeBlocks.forEach(block => {
      count++;
      if (!type) {
        type = block.getType();
        return;
      } else if (block.getType() != type) {
        objects.push({ type: type, count: count, "line numbers": lineNumbers.join(", ") });
        type = block.getType();
        count = 0;
        lineNumbers = [];
      }
      lineNumbers.push(block.getLineNumber());
    });
    return objects;
  }
}
