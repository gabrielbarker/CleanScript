import { FileTableData } from "./TableData";
import TableData from "./TableData";
export default class TableRow {
  private fileTableData: FileTableData;
  private rows: string[] = [];

  constructor(fileTableData: FileTableData) {
    this.fileTableData = fileTableData;
    fileTableData.invalid.forEach(() => this.rows.push("|"));
    this.createTableRow();
  }

  public getRowLines(): string[] {
    return this.rows;
  }

  private createTableRow(): void {
    this.getFileNameColumn();
    this.getColumnWithField("type");
    this.getColumnWithField("count");
    this.getColumnWithField("line numbers");
  }

  private getFileNameColumn() {
    this.rows[0] += this.fileTableData.file;
    this.endColumn();
  }

  private getColumnWithField(fieldName: "type" | "count" | "line numbers") {
    this.fileTableData.invalid.forEach((data, i) => (this.rows[i] += data[fieldName]));
    this.endColumn();
  }

  private endColumn() {
    this.alignRows();
    this.addColumnSeparator();
  }

  private alignRows() {
    const maxLength = Math.max(...this.rows.map(row => row.length));
    this.rows = this.rows.map(row => row.padEnd(maxLength + 1, " "));
  }

  private addColumnSeparator() {
    this.rows = this.rows.map(row => (row += "| "));
  }
}
