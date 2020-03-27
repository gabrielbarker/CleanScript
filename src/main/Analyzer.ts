import ConfigRetriever from "../main/ConfigRetriever";
import CodeBlock from "../main/CodeBlock";
import BlockRetrieverLayer from "./BlockRetrieverLayer";
import DataRetrieverLayer from "./DataRetrieverLayer";
import PrinterLayer from "./PrinterLayer";

export default class Analyzer {
  private config: any;
  private blocks: CodeBlock[] = [];
  private lineData: any;
  private kindData: any;
  private invalid: boolean = false;

  constructor(globOrPath: string) {
    this.getConfig();
    this.getBlocks(globOrPath);
    this.getData();
  }

  public print() {
    if (this.invalid) return;
    const printLayer = new PrinterLayer(this.config, this.lineData, this.kindData, this.blocks);
    printLayer.print();
  }

  private getConfig() {
    this.config = new ConfigRetriever().getConfig();
  }

  private getBlocks(globOrPath: string) {
    const blockRetrieverLayer = new BlockRetrieverLayer(globOrPath, this.config.ignore || []);
    this.blocks = blockRetrieverLayer.getBlocks();
    this.validateBlocks(globOrPath);
  }

  private validateBlocks(globOrPath: string) {
    const errorMessage = `There are no TypeScript or JavaScript related to the path '${globOrPath}' that contain valid blocks.`;
    if (!this.blocks.length) {
      console.log(errorMessage);
      this.invalid = true;
    }
  }

  private getData() {
    if (this.invalid) return;
    const dataRetrieverLayer = new DataRetrieverLayer(this.blocks, this.config);
    this.lineData = dataRetrieverLayer.getLineData();
    this.kindData = dataRetrieverLayer.getKindData();
    this.validateData();
  }

  private validateData() {
    const errorMessage = `The returned data is not in the correct format and cannot be rendered.`;
    if (!this.lineData.files || !this.kindData.files) {
      console.log(errorMessage);
      this.invalid = true;
    }
  }
}
