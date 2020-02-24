import { BlockType } from "./BlockType";
import CodeBlock from "./CodeBlock";

export default interface BlockTypeAnalyzer {
  typeOf(block: CodeBlock): BlockType;
}
