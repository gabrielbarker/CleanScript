import DataRetriever from "./DataRetriever";
import LineLimitSelector from "./LineLimitSelector";
import TypeLimitSelector from "./TypeLimitSelector";
import Taybl from "taybl";
import FileData from "./FileData";
import FileFormatter from "./FileFormatter";
import TableFormatter from "./TableFormatter";
import TypeLimitFileFormatter from "./TypeLimitFileFormatter";
import LineLimitFileFormatter from "./LineLimitFileFormatter";
import InvalidSelector from "./InvalidSelector";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const lineSelector = new LineLimitSelector();
  const invalidLineSelector = new InvalidSelector(lineSelector);
  const lineFormatter = new LineLimitFileFormatter();

  const typeSelector = new TypeLimitSelector();
  const invalidTypeSelector = new InvalidSelector(typeSelector);
  const typeFormatter = new TypeLimitFileFormatter();

  printLimits(revmanPath, invalidLineSelector, lineFormatter);
  printLimits(revmanPath, invalidTypeSelector, typeFormatter);
}

function printLimits(dirPath: string, selector: InvalidSelector, formatter: FileFormatter) {
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
