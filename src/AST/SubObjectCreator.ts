import CodeBlock from "./CodeBlock";

export default interface SubObjectCreator {
  createObject(blocks: CodeBlock[]): any;
}
