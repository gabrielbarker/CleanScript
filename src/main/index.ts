// import FunctionAnalyzer from "./FunctionAnalyzer";
// import AnalysisData from "./AnalysisData";
// const path = `/Users/gbarker/git/revman/force-app/main/default/classes/${process.argv[2]}.cls`;
// let functionAnalyzer: FunctionAnalyzer = new FunctionAnalyzer();
// let data: AnalysisData[] = functionAnalyzer.getCodeBlockSelector(path);

// data.forEach(d => d.logData());

// import * as fs from "fs";
// import FunctionAnalyzer from "./FunctionAnalyzer";

// const fa = new FunctionAnalyzer();

// const dirPath = "/Users/gbarker/git/revman/force-app/main/default/classes/";
// const files = fs.readdirSync(dirPath);

// files.forEach(f =>
//   fa.getCodeBlockSelector(dirPath + f).forEach(d => {
//     if (d.getNumberOfLines() > 200) {
//       console.log(f);
//       d.logData();
//     }
//   })
// );

import CodeSeparator from "./CodeSeparator";
import DefaultBlockTypeAnalyzer from "./DefaultBlockTypeAnalyzer";
import fs from "fs";
import CodeBlockSelector from "./CodeBlockSelector";
import CodeBlock from "./CodeBlock";
import { BlockType } from "./BlockType";

const path = `/Users/gbarker/SideProjects/CodeAnalyzer/src/main/CodeSeparator.ts`;
const fileText = fs.readFileSync(path).toString();
let codeSeparator = new CodeSeparator(fileText);
let defaultBlockTypeAnalyzer: DefaultBlockTypeAnalyzer = new DefaultBlockTypeAnalyzer();
const blocks = codeSeparator.getCodeBlocks();
const codeBlockSelector = new CodeBlockSelector(blocks);

console.log(" LINES > 100 ".padStart(20, "-").padEnd(40, "-"));
logBlocks(codeBlockSelector.withLengthMoreThan(100).getBlocks());
console.log();

console.log(" TYPE = LOOP & LENGTH > 50 ".padStart(30, "-").padEnd(40, "-"));
logBlocks(
  codeBlockSelector
    .withType(BlockType.LoopType)
    .withLengthMoreThan(50)
    .getBlocks()
);
console.log();

function logBlocks(blocks: CodeBlock[]) {
  blocks.forEach(b => {
    console.log("lines: " + b.getNumberOfLines());
    console.log("type: " + b.getType());
    console.log("declaration: " + b.getDeclaration());
    console.log();
  });
}
