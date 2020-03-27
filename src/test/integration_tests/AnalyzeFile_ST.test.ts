import { expect } from "chai";
import "mocha";
import ASTRetriever from "../../main/ASTRetriever";
import CodeBlock from "../../main/CodeBlock";
import CodeBlockRetriever from "../../main/CodeBlockRetriever";
import DataCreator from "../../main/LimitDataCreator";
import LineLimitSubObjectCreator from "../../main/LineLimitSubObjectCreator";
import KindLimitSubObjectCreator from "../../main/KindLimitSubObjectCreator";
import LineLimitSelector from "../../main/LineLimitSelector";
import KindLimitSelector from "../../main/KindLimitSelector";
import FilePathRetriever from "../../main/FilePathRetriever";
import ArrayFlattener from "../../main/ArrayFlattener";

const filePath = __dirname + "/TestTypeScriptFile.ts";
const expectedFromTestFile: any = {
  class: { count: 2, lineNumberString: "1,30" },
  interface: { count: 2, lineNumberString: "59,63" },
  enum: { count: 2, lineNumberString: "67,73" },
  function: { count: 2, lineNumberString: "2,31" },
  loop: { count: 4, lineNumberString: "20,24,49,53" },
  switch: { count: 2, lineNumberString: "3,32" },
  if: { count: 4, lineNumberString: "12,14,41,43" }
};

describe("System Test: Analyze TypeScript File - config with all values set to 0 for line and 1 for kind, using TestTypeScriptFile", () => {
  const blocks = getBlocksFrom(filePath);

  const lineData = getLineData(blocks);
  const kindData = getKindData(blocks);

  it("should return correctly constructed line objects", () => {
    expect(lineData.files.length).to.equal(1);
    expect(lineData.files[0].invalid.length).to.equal(7);
    lineData.files[0].invalid.forEach((object: any) => {
      expectObjectToHaveCountAndLineNumberString(object);
    });
  });

  it("should return correctly constructed kind objects", () => {
    expect(kindData.files.length).to.equal(1);
    expect(lineData.files[0].invalid.length).to.equal(7);
    lineData.files[0].invalid.forEach((object: any) => {
      expectObjectToHaveCount(object);
    });
  });
});

function expectObjectToHaveCountAndLineNumberString(object: any) {
  const expected = expectedFromTestFile[object.kind];
  expect(object.count).to.equal(expected.count);
  expect(object["line numbers"]).to.equal(expected.lineNumberString);
}

function expectObjectToHaveCount(object: any) {
  const expected = expectedFromTestFile[object.kind];
  expect(object.count).to.equal(expected.count);
}

function getBlocksFrom(glob: string) {
  const pathRetriever = new FilePathRetriever();
  const paths = pathRetriever.getFilePaths(glob);

  const astRetriever = new ASTRetriever();
  const allBlocks = paths.map(path => {
    const ast = astRetriever.getAST(path);
    const blockRetriever = new CodeBlockRetriever(ast);
    return blockRetriever.getBlocks();
  });
  return ArrayFlattener.flatten(allBlocks);
}

function getConfig() {
  return {
    line_limits: {
      class: 0,
      interface: 0,
      enum: 0,
      function: 0,
      loop: 0,
      switch: 0,
      if: 0
    },
    type_limits: {
      class: 1,
      interface: 1,
      enum: 1,
      function: 1,
      loop: 1,
      switch: 1,
      if: 1
    }
  };
}

function getLineData(blocks: CodeBlock[]) {
  const lineLimitDataCreator = new DataCreator(
    blocks,
    new LineLimitSelector(getConfig()),
    new LineLimitSubObjectCreator()
  );
  return lineLimitDataCreator.getTayblData();
}

function getKindData(blocks: CodeBlock[]) {
  const kindLimitDataCreator = new DataCreator(
    blocks,
    new KindLimitSelector(getConfig()),
    new KindLimitSubObjectCreator()
  );
  return kindLimitDataCreator.getTayblData();
}
