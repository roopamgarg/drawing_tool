import { numberToPercentage, percentageToNumber } from "../../helpers";
import { pencilState } from "../../State";
import Position from "./Position";

class Shape {
  private _color: string;
  private _thickness: number;
  private _positions: Position[];
  private _minX: number;
  private _minY: number;
  private _maxX: number;
  private _maxY: number;
  private _selected: boolean;
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this._color = pencilState().color;
    this._thickness = pencilState().thickness;
    this._positions = [];
    this._minX = 100;
    this._minY = 100;
    this._maxX = 0;
    this._maxY = 0;
    this._selected = false;
    this.height = height;
    this.width = width;
  }

  public get color() {
    return this._color;
  }

  public set color(value) {
    this._color = value;
  }
  
  public get thickness(){
    return this._thickness;
  }

  public set thickness(value){
    this._thickness = value;
  }

  public get positions(): Position[] {
    return this._positions;
  }
  public set positions(value: Position[]) {
    this._positions = value;
  }
  public get minX(): number {
    return percentageToNumber(this._minX, this.width);
  }
  public set minX(value: number) {
    this._minX = numberToPercentage(value, this.width);
  }
  public get minY(): number {
    return percentageToNumber(this._minY, this.height);
  }
  public set minY(value: number) {
    this._minY = numberToPercentage(value, this.height);
  }
  // public get minY(){
  //   return this.minY;
  // }
  public get maxX(): number {
    return percentageToNumber(this._maxX, this.width);
  }

  public set maxX(value: number) {
    this._maxX = numberToPercentage(value, this.width);
  }
  // public get maxX(){
  //   return this.maxX;
  // }
  public get maxY(): number {
    return percentageToNumber(this._maxY, this.height);
  }
  public set maxY(value: number) {
    this._maxY = numberToPercentage(value, this.height);
  }
  public addPositionPoint(point: Position) {
    console.log(this.positions);
    this.positions.push(point);
  }
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    this._selected = value;
  }

  public resize(fixedX: number, fixedY: number, Sx: number, Sy: number) {
    const shape: Shape = this.getCopy();
    shape.minX = this.width;
    shape.minY = this.height;
    shape.maxX = 0;
    shape.maxY = 0;
    for (let i = 0; i < shape.positions.length; i++) {
      let pos = shape.positions[i];
      const x = Sx * (pos.x - fixedX) + fixedX;
      const y = Sy * (pos.y - fixedY) + fixedY;
      shape.positions[i] = new Position(x, y, this.width, this.height);
      shape.minX = Math.min(shape.minX, shape.positions[i].x);
      shape.minY = Math.min(shape.minY, shape.positions[i].y);
      shape.maxX = Math.max(shape.maxX, shape.positions[i].x);
      shape.maxY = Math.max(shape.maxY, shape.positions[i].y);
    }
    return shape;
  }
  public move(x1:number,y1:number,x2:number,y2:number){
    const newShape: Shape = this.getCopy();
    newShape.positions = [...newShape.positions];
    newShape.minX = this.width;
    newShape.minY = this.height;
    newShape.maxX = 0;
    newShape.maxY = 0;
 
    for(let i = 0; i < newShape.positions.length; i++){
      const x = newShape.positions[i].x+(x2-x1);
      const y = newShape.positions[i].y+(y2-y1);
      newShape.positions[i] = new Position(x,y,this.width,this.height);

      newShape.minX = Math.min(newShape.minX, newShape.positions[i].x);
      newShape.minY = Math.min(newShape.minY, newShape.positions[i].y);
      newShape.maxX = Math.max(newShape.maxX, newShape.positions[i].x);
      newShape.maxY = Math.max(newShape.maxY, newShape.positions[i].y);
    }
    return newShape;
  }
  public getCopy() {
    const copy = new Shape(this.width, this.height);
    copy._color = this._color;
    copy._thickness = this._thickness;
    copy._positions = [...this._positions];
    copy._minX = this._minX;
    copy._minY = this._minY;
    copy._maxX = this._maxX;
    copy._maxY = this._maxY;
    copy._selected = this._selected;
    return copy;
  }
}

export default Shape;
