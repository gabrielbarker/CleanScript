import CodeSeparator from "../../main/CodeSeparator";
import DefaulBlockAnalyzer from "../../main/DefaultBlockTypeAnalyzer";
import { expect } from "chai";
import CodeBlock from "../../main/CodeBlock";
import "mocha";
import { BlockType } from "../../main/BlockType";
import TestDeclarations from "./TestDeclarations";
import CodeBlockSelector from "../../main/CodeBlockSelector";

describe("Analyse Whole Class", () => {
  const declarations = setDeclarations();
  const innerBlockContent = "\nInner Content\n";

  const fileText = `
${declarations.classDeclarations[0]} {
  ${declarations.interfaceDeclarations[0]} {
    
  }

  ${declarations.functionDeclarations[0]} {
    ${declarations.ifDeclarations[0]} {
      ${innerBlockContent}
    }

    ${declarations.loopDeclarations[0]} {
      ${innerBlockContent}
    }

    ${declarations.loopDeclarations[1]} {
      ${declarations.loopDeclarations[2]} {
          ${innerBlockContent}
      } while(a != b)
    }
  }

  ${declarations.functionDeclarations[1]} {
    ${declarations.collectionDeclarations[0]} { ${innerBlockContent} };
    
    ${declarations.ifDeclarations[1]}{
        ${declarations.collectionDeclarations[1]} {};
    }
  }

  ${declarations.functionDeclarations[2]} { }

  ${declarations.enumDeclarations[0]} {
    enumValue1,
    enumValue2
  }
}
    `.trim();

  const defaulBlockAnalyzer = new DefaulBlockAnalyzer();
  const codeSeparator = new CodeSeparator(fileText);
  const codeBlocks: CodeBlock[] = codeSeparator.getCodeBlocks();
  const codeBlockSelector: CodeBlockSelector = new CodeBlockSelector(codeBlocks);

  const indentationLevel0 = codeBlockSelector.withIndentationLevel(0).getBlocks();
  const indentationLevel1 = codeBlockSelector.withIndentationLevel(1).getBlocks();
  const indentationLevel2 = codeBlockSelector.withIndentationLevel(2).getBlocks();
  const indentationLevel3 = codeBlockSelector.withIndentationLevel(3).getBlocks();

  it("each indentation level should have the correct number of blocks", () => {
    expect(codeBlocks.length).to.equal(13);
    expect(codeBlockSelector.withIndentationLevel(0).getBlocks().length).to.equal(1);
    expect(codeBlockSelector.withIndentationLevel(1).getBlocks().length).to.equal(5);
    expect(codeBlockSelector.withIndentationLevel(2).getBlocks().length).to.equal(5);
    expect(codeBlockSelector.withIndentationLevel(3).getBlocks().length).to.equal(2);
  });

  const classBlocks = codeBlockSelector.withType(BlockType.ClassType).getBlocks();
  const interfaceBlocks = codeBlockSelector.withType(BlockType.InterfaceType).getBlocks();
  const enumBlocks = codeBlockSelector.withType(BlockType.EnumType).getBlocks();
  const functionBlocks = codeBlockSelector.withType(BlockType.FunctionType).getBlocks();
  const loopBlocks = codeBlockSelector.withType(BlockType.LoopType).getBlocks();
  const ifBlocks = codeBlockSelector.withType(BlockType.IfType).getBlocks();
  const collectionBlocks = codeBlockSelector.withType(BlockType.CollectionType).getBlocks();

  it("each block should have the correct declaration", () => {
    expect(classBlocks[0].getDeclaration()).to.equal(declarations.classDeclarations[0]);
    expect(classBlocks[0].getBlock()).to.equal(fileText);

    expect(interfaceBlocks[0].getDeclaration()).to.equal(declarations.interfaceDeclarations[0]);
    expect(enumBlocks[0].getDeclaration()).to.equal(declarations.enumDeclarations[0]);

    expect(functionBlocks[0].getDeclaration()).to.equal(declarations.functionDeclarations[0]);
    expect(functionBlocks[1].getDeclaration()).to.equal(declarations.functionDeclarations[1]);
    expect(functionBlocks[2].getDeclaration()).to.equal(declarations.functionDeclarations[2]);

    expect(ifBlocks[0].getDeclaration()).to.equal(declarations.ifDeclarations[0]);
    expect(ifBlocks[1].getDeclaration()).to.equal(declarations.ifDeclarations[1]);

    expect(loopBlocks[0].getDeclaration()).to.equal(declarations.loopDeclarations[0]);
    expect(loopBlocks[1].getDeclaration()).to.equal(declarations.loopDeclarations[2]);
    expect(loopBlocks[2].getDeclaration()).to.equal(declarations.loopDeclarations[1]);

    expect(collectionBlocks[0].getDeclaration()).to.equal(declarations.collectionDeclarations[0]);
    expect(collectionBlocks[1].getDeclaration()).to.equal(declarations.collectionDeclarations[1]);

    expect(defaulBlockAnalyzer.typeOf(classBlocks[0])).to.equal(BlockType.ClassType);
    expect(defaulBlockAnalyzer.typeOf(interfaceBlocks[0])).to.equal(BlockType.InterfaceType);
    expect(defaulBlockAnalyzer.typeOf(enumBlocks[0])).to.equal(BlockType.EnumType);
    expect(defaulBlockAnalyzer.typeOf(functionBlocks[0])).to.equal(BlockType.FunctionType);
    expect(defaulBlockAnalyzer.typeOf(loopBlocks[0])).to.equal(BlockType.LoopType);
    expect(defaulBlockAnalyzer.typeOf(collectionBlocks[0])).to.equal(BlockType.CollectionType);
  });

  function setDeclarations() {
    const declarations = new TestDeclarations();
    declarations.classDeclarations.push("public class TestClass");

    declarations.interfaceDeclarations.push("private interface InnerInterface");
    declarations.enumDeclarations.push("private enum InnerEnum");

    declarations.functionDeclarations.push("public function1(param1)");
    declarations.functionDeclarations.push("public function2 (param2, param3)");
    declarations.functionDeclarations.push("public function3()");

    declarations.loopDeclarations.push("while(x < 1)");
    declarations.loopDeclarations.push("for (int i = 0; i < n; i++)");
    declarations.loopDeclarations.push("do");

    declarations.ifDeclarations.push("if(y < 1)");
    declarations.ifDeclarations.push("if (a == b)");

    declarations.collectionDeclarations.push("List<String> list1");
    declarations.collectionDeclarations.push("Set <Integer> set1");
    declarations.collectionDeclarations.push("listOfThings: string[]");

    return declarations;
  }
});
