import CodeBlock from "./CodeBlock";

export default interface LimitBlockSelector {
  getInvalidBlocks(config: any, codeBlocks: CodeBlock[]): CodeBlock[];
}
