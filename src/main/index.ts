import DataRetriever from "./DataRetriever";
import Display from "./Display";
import InvalidBlockSelector from "./InvalidBlockSelector";
import TableData from "./table/TableData";
import TableRenderer from "./table/TableRenderer";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const dataRetriever: DataRetriever = new DataRetriever(dirPath);
  const directoryData = dataRetriever.getFileData();
  const data = [];
  const tableData = new TableData(directoryData);
  const tableRenderer = new TableRenderer(tableData);
  tableRenderer.printTable();
  // directoryData.forEach(fileData => {
  //   const invalidBlockSelector = new InvalidBlockSelector(fileData.getCodeBlocks());
  //   const invalidBlocks = invalidBlockSelector.getBlocksOverLineLimit();
  //   const display = new Display(fileData.getFileName(), invalidBlocks);
  //   display.printInvalidBlocks();
  // });
}

printDirectoryAnalysis(codeAnalyzerPath);
