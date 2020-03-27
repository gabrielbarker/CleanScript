import CodeBlock from "./CodeBlock";
import SubObjectCreator from "./SubObjectCreator";

export default class LineLimitSubObjectCreator implements SubObjectCreator {
  public createObject(blocks: CodeBlock[]) {
    const lineNumbersString = blocks.map(block => block.lineNumber).join(",");
    return { kind: blocks[0].kind, count: blocks.length, "line numbers": lineNumbersString };
  }
}
