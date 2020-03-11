import FileAnalyzer from "./FileAnalyzer";
import Display from "./Display";
import InvalidBlockSelector from "./InvalidBlockSelector";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

function printDirectoryAnalysis(dirPath: string) {
  const directoryData = FileAnalyzer.getDataFromDirectory(dirPath);
  directoryData.forEach(fileData => {
    const invalidBlockSelector = new InvalidBlockSelector(fileData.getCodeBlocks());
    const invalidBlocks = invalidBlockSelector.getBlocksOverLineLimit();
    const display = new Display(fileData.getFileName(), invalidBlocks);
    display.printInvalidBlocks();
  });
}

printDirectoryAnalysis(revmanPath);
