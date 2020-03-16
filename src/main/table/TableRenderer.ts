import TableData from "./TableData";
import TableRow from "./TableRow";
export default class TableRenderer {
  private tableData: TableData;
  private rows: TableRow[] = [];

  constructor(tableData: TableData) {
    this.tableData = tableData;
    this.tableData.getTableData().forEach(fileData => this.rows.push(new TableRow(fileData)));
  }

  public printTable() {
    this.printRowSeparator();
    this.rows.forEach(row => {
      this.printRow(row);
      this.printRowSeparator();
    });
  }

  private printRow(row: TableRow): void {
    row.getRowLines().forEach(rowLine => console.log(rowLine));
  }

  private printRowSeparator(): void {
    console.log("".padEnd(this.maxRowLength(), "-"));
  }

  private maxRowLength(): number {
    return Math.max(...this.rows.map(row => row.getRowLines()[0].length));
  }
}
