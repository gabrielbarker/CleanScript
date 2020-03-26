import CodeBlock from "./CodeBlock";
import FilePathRetriever from "./FilePathRetriever";
import ArrayFlattener from "./ArrayFlattener";
import ASTRetriever from "./ASTRetriever";
import CodeBlockRetriever from "./CodeBlockRetriever";

export default class BlockRetrieverLayer {
  private globsToIgnore: string[];
  private paths: string[] = [];
  private blocks: CodeBlock[] = [];

  constructor(globOrPath: string, globsToIgnore: string[]) {
    this.globsToIgnore = globsToIgnore;
    this.paths = this.getPaths(globOrPath);
    if (!this.paths.length) return;
    this.filterPaths();
    this.getBlocksFromPaths();
  }

  public getBlocks(): CodeBlock[] {
    return this.blocks;
  }

  private getPaths(globOrPath: string): string[] {
    const pathRetriever = new FilePathRetriever();
    return pathRetriever.getFilePaths(globOrPath);
  }

  private filterPaths() {
    if (!this.globsToIgnore || !this.globsToIgnore.length) return;
    const nestedPathsToIgnore = this.globsToIgnore.map(glob => this.getPaths(glob));
    const pathsToIgnore = ArrayFlattener.flatten(nestedPathsToIgnore);
    this.paths = this.paths.filter(path => !pathsToIgnore.includes(path));
  }

  private getBlocksFromPaths() {
    const astRetriever = new ASTRetriever();
    const allBlocks = this.paths.map(path => {
      const ast = astRetriever.getAST(path);
      return new CodeBlockRetriever(ast).getBlocks();
    });
    this.blocks = ArrayFlattener.flatten(allBlocks);
  }
}
