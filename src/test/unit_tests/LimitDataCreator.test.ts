import { expect } from "chai";
import * as TypeMoq from "typemoq";
import "mocha";
import TestCodeBlockCreator from "./TestCodeBlockCreator";
import LimitDataCreator from "../../main/LimitDataCreator";
import LimitSelector from "../../main/LimitSelector";
import KindLimitSelector from "../../main/KindLimitSelector";
import KindLimitSubObjectCreator from "../../main/KindLimitSubObjectCreator";
import CodeBlock from "../../main/CodeBlock";
import SubObjectCreator from "../../main/SubObjectCreator";

const KIND = "function";
const COUNT = 5;
const NUMBER_OF_FILES = 5;

describe("Limit Data Creator: getTayblData - list of objects of the correct format", () => {
  const blocks = getBlocksFromDifferentFiles();
  const mockSelector = getMockSelector();
  const mockCreator = getMockCreator();

  const creator = new LimitDataCreator(blocks, mockSelector, mockCreator);
  const tayblData = creator.getTayblData();

  it("should return an object in the correct format with correct values", () => {
    expect(tayblData.files.length).to.equal(NUMBER_OF_FILES);

    tayblData.files.forEach((fileObj: any, index: number) => {
      expect(fileObj["file name"]).to.equal("file" + index);
      expect(fileObj.invalid.length).to.equal(1);

      fileObj.invalid.forEach((subObj: any) => {
        expect(subObj.kind).to.equal(KIND);
        expect(subObj.count).to.equal(COUNT);
      });
    });
  });
});

describe("Limit Data Creator: getTayblData - selector returns empty list (all blocks are valid)", () => {
  const blocks = getBlocksFromDifferentFiles();
  const mockSelector = getMockSelector();
  mockSelector.getBlocks = () => [];
  const mockCreator = getMockCreator();

  const creator = new LimitDataCreator(blocks, mockSelector, mockCreator);
  const tayblData = creator.getTayblData();

  it("should return an object with no sub-objects", () => {
    expect(tayblData.files.length).to.equal(0);
  });
});

function getBlocksFromDifferentFiles() {
  const blockCreator = new TestCodeBlockCreator();
  for (let i = 0; i < NUMBER_OF_FILES; i++) {
    blockCreator
      .withFileName("file" + i)
      .withKind(KIND)
      .create(COUNT);
  }
  return blockCreator.getBlocks();
}

function getMockSelector(): LimitSelector {
  const mockSelector: TypeMoq.IMock<KindLimitSelector> = TypeMoq.Mock.ofInstance(
    new KindLimitSelector({})
  );
  mockSelector.object.getBlocks = (blocks: CodeBlock[]) => blocks;
  return mockSelector.object;
}

function getMockCreator(): SubObjectCreator {
  const mockCreator: TypeMoq.IMock<KindLimitSubObjectCreator> = TypeMoq.Mock.ofType(
    KindLimitSubObjectCreator
  );
  mockCreator.object.createObject = (blocks: CodeBlock[]) => {
    return { kind: blocks[0].kind, count: blocks.length };
  };
  return mockCreator.object;
}
