export enum BlockType {
  ClassType = "class",
  InterfaceType = "interface",
  EnumType = "enum",
  FunctionType = "function",
  IfType = "if statement",
  LoopType = "loop",
  CollectionType = "collection",
  InvalidType = "invalid type"
}

export function blockTypeOf(blockType: string): BlockType {
  switch (blockType) {
    case "class":
      return BlockType.ClassType;
    case "interface":
      return BlockType.InterfaceType;
    case "enum":
      return BlockType.EnumType;
    case "function":
      return BlockType.FunctionType;
    case "if statement":
      return BlockType.IfType;
    case "loop":
      return BlockType.LoopType;
    case "collection":
      return BlockType.CollectionType;
    default:
      return BlockType.InvalidType;
  }
}
