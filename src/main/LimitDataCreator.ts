import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";
import SubObjectCreator from "./SubObjectCreator";
import LimitSelector from "./LimitSelector";

type FileObject = { fileName: string; invalid: KindObject[] };
type KindObject = { kind: string; count: number; "line numbers": string };

export default class LimitDataCreator {
  private blocks: CodeBlock[];
  private fileObjects: FileObject[] = [];
  private limitSelector: LimitSelector;
  private subObjectCreator: SubObjectCreator;

  constructor(
    blocks: CodeBlock[],
    limitSelector: LimitSelector,
    subObjectCreator: SubObjectCreator
  ) {
    this.blocks = blocks;
    this.limitSelector = limitSelector;
    this.subObjectCreator = subObjectCreator;
    this.createFileObjects();
    this.filterFileObjects();
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

  private filterFileObjects(): void {
    this.fileObjects = this.fileObjects.filter(fileObject => fileObject.invalid.length);
  }

  private getAllFileNames(): string[] {
    const namesSet = new Set<string>(this.blocks.map(block => block.fileName));
    return [...namesSet];
  }

  private createFileObject(blocks: CodeBlock[]): any {
    const selector = new CodeBlockSelector(blocks);
    const kinds = this.getAllKindsFor(blocks);
    return { fileName: blocks[0].fileName, invalid: this.getAllKindObjects(kinds, selector) };
  }

  private getAllKindsFor(blocks: CodeBlock[]): string[] {
    const kindSet = new Set<string>(blocks.map(block => block.kind));
    return [...kindSet];
  }

  private getAllKindObjects(kinds: string[], selector: CodeBlockSelector) {
    return kinds.map(kind => this.getKindObject(kind, selector)).filter(obj => obj);
  }

  private getKindObject(kind: string, selector: CodeBlockSelector): KindObject | undefined {
    const blocksWithSameKind = selector.withKind(kind).getBlocks();
    const invalidBlocks = this.limitSelector.getBlocks(blocksWithSameKind);
    if (invalidBlocks.length) return this.createKindObject(invalidBlocks);
  }

  private createKindObject(blocks: CodeBlock[]): KindObject {
    return this.subObjectCreator.createObject(blocks);
  }
}
