import { expect } from "chai";
import CodeBlock from "../../main/CodeBlock";
import "mocha";
import CodeBlockFactory from "../../main/CodeBlockFactory";
import DefaultBlockTypeAnalyzer from "../../main/DefaultBlockTypeAnalyzer";

describe("Code Block: constructor - single class", () => {
  const declaration = "public class TestClass";
  const fileText = `
    ${declaration} {
      
    }
  `.trim();

  const codeBlock: CodeBlock = getSingleCodeBlock(fileText);

  assertCorrectValues(codeBlock, fileText, declaration, 1);
});

describe("Code Block: constructor - multi-line declaration", () => {
  const declaration = `
  public void testMethod(
    String expectedSourceObjectType
  )`.trim();

  const fileText = `
  ${declaration} {
    function content
  }`.trim();

  const codeBlock: CodeBlock = getSingleCodeBlock(fileText);

  assertCorrectValues(codeBlock, fileText, declaration, 3);
});

function getSingleCodeBlock(fileText: string): CodeBlock {
  const codeBlockFactory: CodeBlockFactory = new CodeBlockFactory(
    fileText,
    new DefaultBlockTypeAnalyzer()
  );
  return codeBlockFactory.getBlock(fileText.indexOf("{"), fileText.indexOf("}"));
}

function assertCorrectValues(
  codeBlock: CodeBlock,
  fileText: string,
  declaration: string,
  numberOfLines: number
): void {
  it("should have correct block", () => {
    expect(codeBlock.getBlock()).to.equal(fileText.trim());
  });

  it("should have correct declaration", () => {
    expect(codeBlock.getDeclaration()).to.equal(declaration);
  });

  it("should have correct number of lines", () => {
    expect(codeBlock.getNumberOfLines()).to.equal(numberOfLines);
  });
}
