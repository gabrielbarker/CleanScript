import { BlockType } from "./BlockType";
import CodeBlock from "./CodeBlock";
import BlockTypeAnalyzer from "./BlockTypeAnalyzer";

export default class DefaultBlockTypeAnalyzer implements BlockTypeAnalyzer {
  private blockDeclaration: string = "";

  public typeOf(block: CodeBlock): BlockType {
    this.blockDeclaration = " " + block.getDeclaration();
    if (this.blockDeclaration.includes(" class ")) return BlockType.ClassType;
    if (this.blockDeclaration.includes(" enum ")) return BlockType.EnumType;
    if (this.blockDeclaration.includes(" interface ")) return BlockType.InterfaceType;
    if (this.functionIncludesKeyword(this.blockDeclaration, "if")) return BlockType.IfType;
    if (this.genericIncludesKeywords(this.blockDeclaration, ["List", "Set"]))
      return BlockType.CollectionType;
    if (this.functionIncludesKeywords(this.blockDeclaration, ["for", "while"]))
      return BlockType.LoopType;
    if (this.blockDeclaration.includes(" do")) return BlockType.LoopType;
    return BlockType.FunctionType;
  }

  private functionIncludesKeywords(text: string, keywords: string[]) {
    let includes = false;
    keywords.forEach(keyword => {
      if (this.functionIncludesKeyword(text, keyword)) includes = true;
    });
    return includes;
  }

  private functionIncludesKeyword(text: string, keyword: string) {
    return text.includes(` ${keyword}(`) || text.includes(` ${keyword} `);
  }

  private genericIncludesKeywords(text: string, keywords: string[]) {
    let includes = false;
    keywords.forEach(keyword => {
      if (this.genericIncludesKeyword(text, keyword)) includes = true;
    });
    return includes;
  }

  private genericIncludesKeyword(text: string, keyword: string) {
    return text.includes(` ${keyword}<`) || text.includes(` ${keyword} `);
  }
}
