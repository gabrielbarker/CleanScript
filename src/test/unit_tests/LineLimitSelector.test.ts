import { expect } from "chai";
import "mocha";
import TestCodeBlockCreator from "./TestCodeBlockCreator";
import LineLimitSelector from "../../main/LineLimitSelector";

const LIMIT = 5;
const CONFIG = { line_limits: { function: LIMIT } };

describe("Line Limit Selector: getBlocks - list of blocks of same kind", () => {
  const lineLimitSelector = new LineLimitSelector(CONFIG);
  const blocks = getBlocksWithNumberOfLinesSurroundingLimit();
  const blocksExceedingLimits = lineLimitSelector.getBlocks(blocks);

  it("should return an empty array", () => {
    expect(blocksExceedingLimits.length).to.equal(1);
    expect(blocksExceedingLimits[0].numberOfLines).to.equal(LIMIT + 1);
  });
});

function getBlocksWithNumberOfLinesSurroundingLimit() {
  const blockCreator = new TestCodeBlockCreator();
  createBlockWithNumberOfLines(blockCreator, LIMIT - 1);
  createBlockWithNumberOfLines(blockCreator, LIMIT);
  createBlockWithNumberOfLines(blockCreator, LIMIT + 1);
  return blockCreator.getBlocks();
}

function createBlockWithNumberOfLines(creator: TestCodeBlockCreator, numberOfLines: number) {
  creator
    .withNumberOfLines(numberOfLines)
    .withKind("function")
    .create(1);
}
