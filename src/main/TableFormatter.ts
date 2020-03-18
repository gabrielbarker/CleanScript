import FileData from "./FileData";
import LineLimitFileFormatter, { FileTableData } from "./LineLimitFileFormatter";
import FileFormatter from "./FileFormatter";

export default class TableFormatter {
  private tableData: FileTableData[] = [];

  constructor(filesData: FileData[], formatter: FileFormatter) {
    filesData.forEach(fileData => {
      const data = formatter.getFileTableData(fileData);
      if (data.invalid.length) this.tableData.push(data);
    });
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }
}
