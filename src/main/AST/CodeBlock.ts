export default class CodeBlock {
  public readonly fileName: string;
  public readonly kind: number;
  public readonly text: string;
  public readonly lineNumber: number;
  public readonly numberOfLines: number;

  constructor(
    fileName: string,
    kind: number,
    text: string,
    lineNumber: number,
    numberOfLines: number
  ) {
    this.fileName = fileName;
    this.kind = kind;
    this.text = text;
    this.lineNumber = lineNumber;
    this.numberOfLines = numberOfLines;
  }
}
