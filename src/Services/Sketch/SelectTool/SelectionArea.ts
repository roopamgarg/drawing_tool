import { numberToPercentage, percentageToNumber } from "../../helpers";

class SelectionArea {
  private _x1: number;
  private _y1: number;
  private _x2: number;
  private _y2: number;
  private _width: number;

  private _height: number;

  constructor(width: number, height: number) {
    this._x1 = 0;
    this._y1 = 0;
    this._x2 = 0;
    this._y2 = 0;
    this._width = width;
    this._height = height;
  }
  public set x1(x: number) {
    this._x1 = numberToPercentage(x, this._width);
  }
  public set x2(x: number) {
    this._x2 = numberToPercentage(x, this._width);
  }
  public set y1(y) {
    this._y1 = numberToPercentage(y, this._height);
  }
  public set y2(y) {
    this._y2 = numberToPercentage(y, this._height);
  }
  public get x1() {
    return percentageToNumber(this._x1, this._width);
  }
  public get x2() {
    return percentageToNumber(this._x2, this._width);
  }
  public get y1() {
    return percentageToNumber(this._y1, this._height);
  }
  public get y2() {
    return percentageToNumber(this._y2, this._height);
  }
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  protected isPointInside(target_x: number, target_y: number) {
    //console.log(`(${x1},${y1}) (${x2},${y2}) -> (${target_x},${target_y})`, res);
    return (
      Math.min(this.x1, this.x2) <= target_x &&
      target_x <= Math.max(this.x1, this.x2) &&
      Math.min(this.y1, this.y2) <= target_y &&
      target_y <= Math.max(this.y1, this.y2)
    );
  }


}

export default SelectionArea;
