import DataRetriever from "./DataRetriever";
import LineLimitBlockSelector from "./LineLimitBlockSelector";
import LineLimitTableFormatter from "./LineLimitTableFormatter";
import TypeLimitBlockSelector from "./TypeLimitBlockSelector";
import TypeLimitTableFormatter from "./TypeLimitTableFormatter";
import Taybl from "taybl";
import FileData from "./FileData";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const dataRetriever: DataRetriever = new DataRetriever(dirPath);
  let directoryData = dataRetriever.getFileData();
  directoryData = directoryData.map(fileData => {
    const selector = new LineLimitBlockSelector(fileData.getCodeBlocks());
    return new FileData(fileData.getFileName(), selector.getBlocksOverLineLimit());
  });

  const lineLimitData = new LineLimitTableFormatter(directoryData).getTableData();
  const lineLimitTaybl = new Taybl({ files: lineLimitData });
  lineLimitTaybl
    .withHorizontalLineStyle("=")
    .withVerticalLineStyle(":")
    .withNumberOfSpacesAtStartOfColumns(2)
    .withNumberOfSpacesAtEndOfColumns(2)
    .print();

  directoryData = dataRetriever.getFileData();
  directoryData = directoryData.map(fileData => {
    const selector = new TypeLimitBlockSelector(fileData.getCodeBlocks());
    return new FileData(fileData.getFileName(), selector.getBlocksOverTypeLimit());
  });

  const typeLimitData = new TypeLimitTableFormatter(directoryData).getTableData();
  const typeLimitTaybl = new Taybl({ files: typeLimitData });
  typeLimitTaybl
    .withHorizontalLineStyle("=")
    .withVerticalLineStyle(":")
    .withNumberOfSpacesAtStartOfColumns(2)
    .withNumberOfSpacesAtEndOfColumns(2)
    .print();
}

const before = Date.now();
printDirectoryAnalysis(revmanPath);
const after = Date.now();
console.log(after - before);
