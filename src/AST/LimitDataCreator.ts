import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import KindObjectCreator from "./KindLimitSubObjectCreator";
import SubObjectCreator from "./SubObjectCreator";

type FileObject = { fileName: string; invalid: KindObject[] };
type KindObject = { kind: string; count: number; "line numbers": string };

export default class LimitDataCreator {
  private blocks: CodeBlock[];
  private fileObjects: FileObject[] = [];
  private subObjectCreator: SubObjectCreator;

  constructor(blocks: CodeBlock[], subObjectCreator: SubObjectCreator) {
    this.blocks = blocks;
    this.subObjectCreator = subObjectCreator;
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
    return this.subObjectCreator.createObject(blocks);
  }
}
