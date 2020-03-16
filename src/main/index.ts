import DataRetriever from "./DataRetriever";
import InvalidBlockSelector from "./InvalidBlockSelector";
import TableData from "./TableData";
import Taybl from "taybl";
import FileData from "./FileData";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const dataRetriever: DataRetriever = new DataRetriever(dirPath);
  let directoryData = dataRetriever.getFileData();
  directoryData = directoryData.map(fileData => {
    const selector = new InvalidBlockSelector(fileData.getCodeBlocks());
    return new FileData(fileData.getFileName(), selector.getBlocksOverLineLimit());
  });
  const tableData = new TableData(directoryData);
  const taybl = new Taybl(tableData);
  taybl
    .withHorizontalLineStyle("=")
    .withVerticalLineStyle("||")
    .withNumberOfSpacesAtStartOfColumns(2)
    .withNumberOfSpacesAtEndOfColumns(2)
    .print();
}

const before = Date.now();
printDirectoryAnalysis(revmanPath);
const after = Date.now();
console.log(after - before);
