import { expect } from "chai";
import "mocha";
import CodeBlockSelector from "../../main/CodeBlockSelector";
import TestCodeBlockCreator from "./TestCodeBlockCreator";

describe("Code Block Selector: withKind - 'function'", () => {
  const creator = new TestCodeBlockCreator();
  creator.withKind("function").create(5);
  creator.create(10);

  const blocks = creator.getBlocks();

  const selector = new CodeBlockSelector(blocks);

  it("should return correct number of blocks with kind property set", () => {
    const functions = selector.withKind("function").getBlocks();
    expect(functions.length).to.equal(5);
    functions.forEach(block => expect(block.kind).to.equal("function"));
  });
});

describe("Code Block Selector: withFileName - 'testFile'", () => {
  const creator = new TestCodeBlockCreator();
  creator.withFileName("testFile").create(5);
  creator.create(10);

  const blocks = creator.getBlocks();

  const selector = new CodeBlockSelector(blocks);

  it("should return correct number of blocks with fileName property set", () => {
    const namedBlocks = selector.withFileName("testFile").getBlocks();
    expect(namedBlocks.length).to.equal(5);
    namedBlocks.forEach(block => expect(block.fileName).to.equal("testFile"));
  });
});

describe("Code Block Selector: withNumberOfLinesMoreThan - 50", () => {
  const creator = new TestCodeBlockCreator();
  creator.withNumberOfLines(100).create(5);
  creator.create(10);

  const blocks = creator.getBlocks();

  const selector = new CodeBlockSelector(blocks);

  it("should return correct number of blocks with number of lines more in correct range", () => {
    const namedBlocks = selector.withNumberOfLinesMoreThan(50).getBlocks();
    expect(namedBlocks.length).to.equal(5);
    namedBlocks.forEach(block => expect(block.numberOfLines).to.be.above(50));
  });
});

describe("Code Block Selector: withNumberOfLinesMoreThan - 1000", () => {
  const creator = new TestCodeBlockCreator();
  creator.create(10);

  const blocks = creator.getBlocks();

  const selector = new CodeBlockSelector(blocks);

  it("should return an empty array", () => {
    const namedBlocks = selector.withNumberOfLinesMoreThan(1000).getBlocks();
    expect(namedBlocks.length).to.equal(0);
  });
});
