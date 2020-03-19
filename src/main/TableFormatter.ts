import FileData from "./FileData";
import FileFormatter from "./FileFormatter";

export default class TableFormatter {
  private tableData: {}[] = [];

  constructor(filesData: FileData[], formatter: FileFormatter) {
    filesData.forEach(fileData => {
      const data = formatter.getFileTableData(fileData);
      if (data.invalid.length) this.tableData.push(data);
    });
  }

  public getTableData(): {}[] {
    return this.tableData;
  }
}
