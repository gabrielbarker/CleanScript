import FileAnalyzer from "./FileAnalyzer";
import { BlockType } from "./BlockType";
import Display from "./Display";
import InvalidBlockSelector from "./InvalidBlockSelector";

const codeAnalyzerPath = `/Users/gbarker/GitHub/CodeAnalyzer/src/main/`;
const revmanPath = `/Users/gbarker/git/revman/force-app/main/default/classes/`;

const directoryData = FileAnalyzer.getDataFromDirectory(revmanPath);
directoryData.forEach(fileData => {
  const invalidBlockSelector = new InvalidBlockSelector(fileData.getCodeBlocks());

  const functions = invalidBlockSelector.getBlocksOverLineLimitOfType(BlockType.FunctionType);
  const classes = invalidBlockSelector.getBlocksOverLineLimitOfType(BlockType.ClassType);
  const loops = invalidBlockSelector.getBlocksOverLineLimitOfType(BlockType.LoopType);

  const invalidBlocks = functions.concat(classes, loops);

  if (invalidBlocks.length) {
    const display = new Display(fileData.getFileName(), invalidBlocks);
    display.print();
  }
});
