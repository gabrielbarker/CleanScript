export default class ArrayFlattener {
  public static flatten(nestedArrays: any[]) {
    return Array.prototype.concat.apply([], nestedArrays);
  }
}
