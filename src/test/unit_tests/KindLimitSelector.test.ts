import { expect } from "chai";
import "mocha";
import TestCodeBlockCreator from "./TestCodeBlockCreator";
import KindLimitSelector from "../../main/KindLimitSelector";

const LIMIT = 5;
const CONFIG = { type_limits: { function: LIMIT } };

describe("Kind Limit Selector: getBlocks - list of blocks of same kind not exceeding limits", () => {
  const kindLimitSelector = new KindLimitSelector(CONFIG);
  const blocks = getBlocksOfKind("function", LIMIT - 1);
  const blocksExceedingLimits = kindLimitSelector.getBlocks(blocks);
  it("should return an empty array", () => {
    expect(blocksExceedingLimits.length).to.equal(0);
  });
});

describe("Kind Limit Selector: getBlocks - list of blocks of same kind equal to limits", () => {
  const kindLimitSelector = new KindLimitSelector(CONFIG);
  const blocks = getBlocksOfKind("function", LIMIT);
  const blocksExceedingLimits = kindLimitSelector.getBlocks(blocks);
  it("should return an empty array", () => {
    expect(blocksExceedingLimits.length).to.equal(0);
  });
});

describe("Kind Limit Selector: getBlocks - list of blocks of same kind exceeding limits", () => {
  const kindLimitSelector = new KindLimitSelector(CONFIG);
  const numberAboveLimit = LIMIT + 1;
  const blocks = getBlocksOfKind("function", numberAboveLimit);
  const blocksExceedingLimits = kindLimitSelector.getBlocks(blocks);
  it("should return every block", () => {
    expect(blocksExceedingLimits.length).to.equal(blocks.length);
  });
});

function getBlocksOfKind(kind: string, number: number) {
  const blockCreator = new TestCodeBlockCreator();
  blockCreator.withKind(kind).create(number);
  return blockCreator.getBlocks();
}
