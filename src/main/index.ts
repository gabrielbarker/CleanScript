import CodeBlockSelector from "./CodeBlockSelector";
import CodeBlock from "./CodeBlock";
import FileAnalyzer from "./FileAnalyzer";
import { BlockType } from "./BlockType";
import Display from "./Display";

const path = `/Users/gbarker/git/revman/force-app/main/default/classes/`;
const directoryData = FileAnalyzer.getBlocksFromDirectory(path);
directoryData.forEach(fileData => {
  const blocks = fileData.getCodeBlocks();
  const codeBlockSelector = new CodeBlockSelector(blocks);
  const invalidClasses = codeBlockSelector
    .withType(BlockType.ClassType)
    .withLengthMoreThan(100)
    .getBlocks();
  const invalidFunctions = codeBlockSelector
    .withType(BlockType.FunctionType)
    .withLengthMoreThan(10)
    .getBlocks();

  const invalidBlocks = invalidClasses.concat(invalidFunctions);

  if (invalidBlocks.length) {
    const display = new Display(fileData.getFileName(), invalidBlocks);
    display.print();
  }
});
