import FileData from "./FileData";
import LineLimitFileFormatter, { FileTableData } from "./LineLimitFileFormatter";

export default class TableFormatter {
  private tableData: FileTableData[] = [];

  constructor(filesData: FileData[]) {
    filesData.forEach(fileData => {
      const data = new LineLimitFileFormatter(fileData).getFileTableData();
      if (data.invalid.length) this.tableData.push(data);
    });
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }
}
