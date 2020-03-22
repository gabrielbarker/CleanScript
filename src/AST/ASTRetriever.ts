import ts from "typescript";
import { readFileSync } from "fs";

export default class ASTRetriever {
  getAST(path: string): ts.SourceFile {
    const sourceCode = readFileSync(path, "utf-8");
    const fileName = path.substring(path.lastIndexOf("/") + 1);
    return ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, true);
  }
}
