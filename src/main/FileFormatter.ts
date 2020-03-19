import FileData from "./FileData";

type FileFormat = { "File Name": string; invalid: any[] };

export default interface FileFormatter {
  getFileTableData(fileData: FileData): FileFormat;
}
