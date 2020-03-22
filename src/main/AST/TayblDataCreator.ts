import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

type FileObject = { fileName: string; invalid: KindObject[] };
type KindObject = { kind: string; count: number; "line numbers": string };

export default class TayblDataCreator {
  private blocks: CodeBlock[];
  private fileObjects: FileObject[] = [];

  constructor(blocks: CodeBlock[]) {
    this.blocks = blocks;
    this.createFileObjects();
  }

  public getTayblData(): any {
    return { files: this.fileObjects };
  }

  private createFileObjects(): void {
    const fileNames = this.getAllFileNames();
    const selector = new CodeBlockSelector(this.blocks);
    fileNames.forEach(name => {
      const blocksWithSameName = selector.withFileName(name).getBlocks();
      this.fileObjects.push(this.createFileObject(blocksWithSameName));
    });
  }

  private getAllFileNames(): string[] {
    const namesSet = new Set<string>(this.blocks.map(block => block.fileName));
    return [...namesSet];
  }

  private getAllKindsFor(blocks: CodeBlock[]): string[] {
    const kindSet = new Set<string>(blocks.map(block => block.kind));
    return [...kindSet];
  }

  private createFileObject(blocks: CodeBlock[]): any {
    const selector = new CodeBlockSelector(blocks);
    const kinds = this.getAllKindsFor(blocks);
    return { fileName: blocks[0].fileName, invalid: this.getAllKindObjects(kinds, selector) };
  }

  private getAllKindObjects(kinds: string[], selector: CodeBlockSelector) {
    return kinds.map(kind => {
      const blocksWithSameKind = selector.withKind(kind).getBlocks();
      return this.createKindObject(blocksWithSameKind);
    });
  }

  private createKindObject(blocks: CodeBlock[]): KindObject {
    return {
      kind: blocks[0].kind,
      count: blocks.length,
      "line numbers": blocks.map(block => block.lineNumber).join(",")
    };
  }
}
