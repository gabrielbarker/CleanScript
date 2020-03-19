import CodeBlock from "./CodeBlock";

export default interface LimitSelector {
  getInvalidBlocks(config: any, codeBlocks: CodeBlock[]): CodeBlock[];
}
