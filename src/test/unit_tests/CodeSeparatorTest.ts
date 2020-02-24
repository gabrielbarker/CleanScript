import CodeSeparator from "../../main/CodeSeparator";
import { expect } from "chai";
import CodeBlock from "../../main/CodeBlock";
import "mocha";

describe("CodeSeperator: getCodeBlocks with single class", () => {
  const declaration = "public class TestClass";
  const fileText = `
      ${declaration} {
        
      }
    `.trim();

  const codeSeparator = new CodeSeparator(fileText);
  const codeBlocks: CodeBlock[] = codeSeparator.getCodeBlocks();

  it("should return one class block", () => {
    expect(codeBlocks.length).to.equal(1);
  });
});
