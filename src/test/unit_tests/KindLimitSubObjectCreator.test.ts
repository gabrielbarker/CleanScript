import { expect } from "chai";
import "mocha";
import TestCodeBlockCreator from "./TestCodeBlockCreator";
import KindLimitSubObjectCreator from "../../main/KindLimitSubObjectCreator";

describe("Line Limit Sub Object Creator: createObject - list of blocks of the same kind", () => {
  const KIND = "function";
  const COUNT = 10;

  const blockCreator = new TestCodeBlockCreator();
  blockCreator.withKind(KIND).create(COUNT);
  const blocks = blockCreator.getBlocks();

  const creator = new KindLimitSubObjectCreator();
  const subObjects = creator.createObject(blocks);

  it("should return an array of correctly constructed objects", () => {
    expect(subObjects.kind).to.equal(KIND);
    expect(subObjects.count).to.equal(COUNT);
  });
});
