import FileData from "./FileData";
import TypeLimitFileFormatter, { FileTableData } from "./TypeLimitFileFormatter";

export default class TableFormatter {
  private tableData: FileTableData[] = [];

  constructor(filesData: FileData[]) {
    filesData.forEach(fileData => {
      const data = new TypeLimitFileFormatter(fileData).getFileTableData();
      if (data.invalid.length) this.tableData.push(data);
    });
  }

  public getTableData(): FileTableData[] {
    return this.tableData;
  }
}
