import CodeBlock from "./CodeBlock";
import SubObjectCreator from "./SubObjectCreator";

export default class KindObjectCreator implements SubObjectCreator {
  public createObject(blocks: CodeBlock[]): any {
    return { kind: blocks[0].kind, count: blocks.length };
  }
}
