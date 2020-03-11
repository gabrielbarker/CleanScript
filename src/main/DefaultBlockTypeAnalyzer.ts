import { BlockType } from "./BlockType";
import CodeBlock from "./CodeBlock";
import BlockTypeAnalyzer from "./BlockTypeAnalyzer";

export default class DefaultBlockTypeAnalyzer implements BlockTypeAnalyzer {
  private declaration: string = "";
  private blockType: BlockType | null = null;

  public typeOf(block: CodeBlock): BlockType {
    this.declaration = " " + block.getDeclaration();
    this.blockType = BlockType.InvalidType;
    this.setBlockType();
    return this.blockType;
  }

  private setBlockType(): void {
    this.setTypeForTopLevelType();
    this.setTypeForIfType();
    this.setTypeForCollectionType();
    this.setTypeForLoopType();
    this.setTypeForFunctionType();
  }

  private setTypeForTopLevelType(): void {
    if (this.blockType !== BlockType.InvalidType) return;
    if (this.declaration.includes(" class ")) this.blockType = BlockType.ClassType;
    if (this.declaration.includes(" enum ")) this.blockType = BlockType.EnumType;
    if (this.declaration.includes(" interface ")) this.blockType = BlockType.InterfaceType;
  }

  private setTypeForLoopType(): void {
    if (this.blockType !== BlockType.InvalidType) return;
    const loopSignifiers = this.getDeclarationSignifierSet(["for", "while"], "(");
    if (this.declarationIncludesAnyOf(loopSignifiers)) this.blockType = BlockType.LoopType;
    if (this.declaration.includes(" do ")) this.blockType = BlockType.LoopType;
  }

  private setTypeForCollectionType(): void {
    if (this.blockType !== BlockType.InvalidType) return;
    const collectionSignifiers = this.getDeclarationSignifierSet(["List", "Set"], "<");
    if (this.declarationIncludesAnyOf(collectionSignifiers))
      this.blockType = BlockType.CollectionType;
  }

  private setTypeForIfType(): void {
    if (this.blockType !== BlockType.InvalidType) return;
    const ifSignifiers = this.getDeclarationSignifierSet(["if"], "(");
    if (this.declarationIncludesAnyOf(ifSignifiers)) this.blockType = BlockType.IfType;
  }

  private setTypeForFunctionType(): void {
    if (this.blockType !== BlockType.InvalidType) return;
    this.blockType = BlockType.FunctionType;
  }

  private getDeclarationSignifierSet(keywords: string[], bracketType: "(" | "<") {
    const signifiers: string[] = [];
    keywords.forEach(keyword => signifiers.concat([` ${keyword} `, ` ${keyword}${bracketType}`]));
    return signifiers;
  }

  private declarationIncludesAnyOf(stringSet: string[]): boolean {
    return stringSet.some(s => this.declaration.includes(s));
  }
}
