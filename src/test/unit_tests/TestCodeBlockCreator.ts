import CodeBlock from "../../main/CodeBlock";

export default class TestCodeBlockCreator {
  private fileName: string = "";
  private kind: string = "";
  private text: string = "";
  private lineNumber: number = 0;
  private numberOfLines: number = 0;

  private defaultString = "value";
  private defaultNumber = 1;
  private blocks: CodeBlock[] = [];

  public getBlocks(): CodeBlock[] {
    return this.blocks;
  }

  public create(number: number): void {
    for (let i = 0; i < number; i++) {
      this.blocks.push(this.getNewCodeBlock());
      this.defaultNumber++;
    }
    this.reset();
  }

  public withFileName(fileName: string): TestCodeBlockCreator {
    this.fileName = fileName;
    return this;
  }

  public withKind(kind: string): TestCodeBlockCreator {
    this.kind = kind;
    return this;
  }

  public withText(text: string): TestCodeBlockCreator {
    this.text = text;
    return this;
  }

  public withLineNumber(lineNumber: number): TestCodeBlockCreator {
    this.lineNumber = lineNumber;
    return this;
  }

  public withNumberOfLines(numberOfLines: number): TestCodeBlockCreator {
    this.numberOfLines = numberOfLines;
    return this;
  }

  private reset(): void {
    this.fileName = "";
    this.kind = "";
    this.text = "";
    this.lineNumber = 0;
    this.numberOfLines = 0;
  }

  private getNewCodeBlock(): CodeBlock {
    return new CodeBlock(
      this.fileName || this.defaultString + this.defaultNumber,
      this.kind || this.defaultString + this.defaultNumber,
      this.text || this.defaultString + this.defaultNumber,
      this.lineNumber || this.defaultNumber,
      this.numberOfLines || this.defaultNumber
    );
  }
}
