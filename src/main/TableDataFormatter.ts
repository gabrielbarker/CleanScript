import FileData from "./FileData";
import TableFileFormatter, { FileTableData } from "./TableFileFormatter";

export default class TableDisplay {
  private tableData: FileTableData[] = [];

  constructor(filesData: FileData[]) {
    filesData.forEach(fileData => {
      const data = new TableFileFormatter(fileData).getFileTableData();
      if (data.invalid.length) this.tableData.push(data);
    });
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }
}
