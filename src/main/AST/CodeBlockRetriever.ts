import ts from "typescript";
import CodeBlock from "./CodeBlock";

export default class CodeBlockRetriever {
  private ast: ts.SourceFile;
  private fileName: string;
  private blocks: CodeBlock[] = [];

  constructor(ast: ts.SourceFile) {
    this.ast = ast;
    this.fileName = ast.fileName;
    this.extractBlocksRecursively(ast);
  }

  public getBlocks(): CodeBlock[] {
    return this.blocks;
  }

  private extractBlocksRecursively(node: ts.Node) {
    this.extractBlock(node);
    node.forEachChild(this.extractBlocksRecursively);
  }

  private extractBlock(node: ts.Node) {
    this.blocks.push(this.getBlockFromNode(node));
  }

  private getBlockFromNode(node: ts.Node): CodeBlock {
    const lineNumber: number = this.ast.getLineAndCharacterOfPosition(node.pos).line;
    const endLineNumber: number = this.ast.getLineAndCharacterOfPosition(node.end).line;
    return new CodeBlock(
      this.fileName,
      node.kind,
      node.getText(),
      lineNumber,
      endLineNumber - lineNumber
    );
  }
}
