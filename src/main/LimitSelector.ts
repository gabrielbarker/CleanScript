import CodeBlock from "./CodeBlock";

export default interface LimitSelector {
  getBlocks(blocksOfSameKind: CodeBlock[]): CodeBlock[];
}
