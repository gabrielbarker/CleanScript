import { expect } from "chai";
import "mocha";
import TestCodeBlockCreator from "./TestCodeBlockCreator";
import LineLimitSubObjectCreator from "../../main/LineLimitSubObjectCreator";

describe("Line Limit Sub Object Creator: createObject - list of blocks of the same kind", () => {
  const KIND = "function";
  const LINE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const LINE_NUMBERS_STRING = LINE_NUMBERS.join(",");
  const COUNT = LINE_NUMBERS.length;
  const blocks = getSequenceOfBlocks(KIND, LINE_NUMBERS);

  const creator = new LineLimitSubObjectCreator();
  const subObjects = creator.createObject(blocks);

  it("should return an array of correctly constructed objects", () => {
    expect(subObjects.count).to.equal(COUNT);
    expect(subObjects["line numbers"]).to.equal(LINE_NUMBERS_STRING);
    expect(subObjects.kind).to.equal(KIND);
  });
});

function getSequenceOfBlocks(kind: string, lineNumbers: number[]) {
  const creator = new TestCodeBlockCreator();
  lineNumbers.forEach(lineNumber =>
    creator
      .withKind(kind)
      .withLineNumber(lineNumber)
      .create(1)
  );
  return creator.getBlocks();
}
