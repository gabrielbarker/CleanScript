import ts from "typescript";

export default class KindMapper {
  public static kindOf(node: ts.Node): string {
    if (this.isIf(node)) return "if";
    if (this.isFunction(node)) return "function";
    if (this.isLoop(node)) return "loop";
    if (this.isSwitch(node)) return "switch";
    if (this.isClass(node)) return "class";
    if (this.isInterface(node)) return "interface";
    if (this.isEnum(node)) return "enum";
    return "other";
  }

  private static isIf(node: ts.Node) {
    return ts.isIfStatement(node);
  }

  private static isFunction(node: ts.Node) {
    return (
      ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node)
    );
  }

  private static isLoop(node: ts.Node) {
    return (
      ts.isForStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isForOfStatement(node) ||
      ts.isWhileStatement(node) ||
      ts.isDoStatement(node)
    );
  }

  private static isSwitch(node: ts.Node) {
    return ts.isSwitchStatement(node);
  }

  private static isClass(node: ts.Node) {
    return ts.isClassDeclaration(node);
  }

  private static isInterface(node: ts.Node) {
    return ts.isInterfaceDeclaration(node);
  }

  private static isEnum(node: ts.Node) {
    return ts.isEnumDeclaration(node);
  }
}
