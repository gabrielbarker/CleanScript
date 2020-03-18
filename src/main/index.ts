import DataRetriever from "./DataRetriever";
import LineLimitBlockSelector from "./LineLimitBlockSelector";
import TypeLimitBlockSelector from "./TypeLimitBlockSelector";
import Taybl from "taybl";
import FileData from "./FileData";
import LimitBlockSelector from "./LimitBlockSelector";
import FileFormatter from "./FileFormatter";
import TableFormatter from "./TableFormatter";
import TypeLimitFileFormatter from "./TypeLimitFileFormatter";
import LineLimitFileFormatter from "./LineLimitFileFormatter";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const lineSelector = new LineLimitBlockSelector();
  const lineFormatter = new LineLimitFileFormatter();
  const typeSelector = new TypeLimitBlockSelector();
  const typeFormatter = new TypeLimitFileFormatter();

  printLimits(revmanPath, lineSelector, lineFormatter);
  printLimits(revmanPath, typeSelector, typeFormatter);
}

function printLimits(dirPath: string, selector: LimitBlockSelector, formatter: FileFormatter) {
  const dataRetriever: DataRetriever = new DataRetriever(dirPath);
  const directoryData = dataRetriever.getFileData().map(fileData => {
    return new FileData(
      fileData.getFileName(),
      selector.getBlocksOverLimit(fileData.getCodeBlocks())
    );
  });
  const limitData = new TableFormatter(directoryData, formatter).getTableData();

  const taybl = new Taybl({ files: limitData });
  taybl
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
