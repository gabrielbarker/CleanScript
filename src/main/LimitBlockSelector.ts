import CodeBlock from "./CodeBlock";

export default interface LimitBlockSelector {
  getBlocksOverLimit(codeBlocks: CodeBlock[]): CodeBlock[];
}
