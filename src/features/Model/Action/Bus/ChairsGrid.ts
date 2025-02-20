type SetBlockParams = { value: number; index: number };
type ConstructorParams = {
  columns: number;
  rows: number;
  blocks: (number | null)[];
};

export class ChairsGrid {
  public rowCount = 0;
  public columnCount = 0;
  public chairCount = 0;
  public nextValue = 1;
  public blocks: (number | null)[] = [];
  constructor({ columns, rows, blocks }: ConstructorParams) {
    this.rowCount = rows;
    this.columnCount = columns;
    this.blocks = blocks.length === 0 ? new Array(columns * rows).fill(null) : blocks;
    this.calcNextValue();
  }
  public move({ index, value }: SetBlockParams): void {
    this.blocks = this.blocks.map((block) => (block === value ? null : block));
    this.blocks[index] = value;
    this.calcNextValue();
  }
  public canMoveTo(index: number): boolean {
    return this.blocks[index] === null;
  }
  private calcNextValue() {
    this.nextValue =
      (this.blocks.reduce((count, value) => (value !== null ? Number(count) + 1 : count), 0) ?? 0) +
      1;
  }
  public removeChair(deleteValue: number) {
    const index = this.blocks.findIndex((value) => deleteValue === value);
    this.blocks[index] = null;
    this.blocks = this.blocks.map((value) =>
      value !== null && value > deleteValue ? value - 1 : value
    );
    this.calcNextValue();
  }
}
