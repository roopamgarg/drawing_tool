import { OUTSIDE_SELECTED, UP_LEFT } from '../../../Constants/cursorPositions';
import { TOP_LEFT_CORNER, TOP_RIGHT_CORNER, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER, INSIDE_SELECTED, UP_RIGHT, RIGHT_UP, RIGHT_DOWN, DOWN_RIGHT, DOWN_LEFT, LEFT_DOWN, LEFT_UP } from '../../../Constants/cursorPositions';
import BoardState from "./BoardState";
import Position from "../Shape/Position";
import Shape from "../Shape/Shape";

class Board {
  private shapes: Shape[];
  private width: number;
  private height:number;
  constructor(width:number,height:number) {
    this.shapes = [];
    this.width = width;
    this.height = height;
  }

  public createState(): BoardState {
    return new BoardState(this.shapes);
  }

  public restore(state: BoardState | undefined): void {
    if (state !== undefined) {
      this.shapes = state.getContent();
    } else {
      this.shapes = [];
    }
  }

  public getCursorPosition(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    posX: number,
    posY: number
  ) {
    x1 = Math.min(x1, x2);
    y1 = Math.min(y1, y2);
    x2 = Math.max(x1, x2);
    y2 = Math.max(y1, y2);
    if (Math.abs(posY - y1) < 10 && x1 <= posX && posX <= x1 + (x2 - x1) / 2) {
      return UP_LEFT;
    } else if (
      Math.abs(posX - x1) < 10 &&
      y1 <= posY &&
      posY <= y1 + (y2 - y1) / 2
    ) {
      return LEFT_UP;
    } else if (
      Math.abs(posX - x1) < 10 &&
      y1 + (y2 - y1) / 2 <= posY &&
      posY <= y2
    ) {
      return LEFT_DOWN;
    } else if (
      Math.abs(posY - y2) < 10 &&
      x1 <= posX &&
      posX <= x1 + (x2 - x1) / 2
    ) {
      return DOWN_LEFT;
    } else if (
      Math.abs(posY - y2) < 10 &&
      x1 + (x2 - x1) / 2 <= posX &&
      posX <= x2
    ) {
      return DOWN_RIGHT;
    } else if (
      Math.abs(posX - x2) < 10 &&
      y1 + (y2 - y1) / 2 <= posY &&
      posY <= y2
    ) {
      return RIGHT_DOWN;
    } else if (
      Math.abs(posX - x2) < 10 &&
      y1 <= posY &&
      posY <= y1 + (y2 - y1) / 2
    ) {
      return RIGHT_UP;
    } else if (
      Math.abs(posY - y1) < 10 &&
      x1 + (x2 - x1) / 2 <= posX &&
      posX <= x2
    ) {
      return UP_RIGHT;
    } else if (
      Math.min(x1, x2) <= posX &&
      posX <= Math.max(x1, x2) &&
      Math.min(y1, y2) <= posY &&
      posY <= Math.max(y1, y2)
    ) {
      return INSIDE_SELECTED;
    } else {
      return OUTSIDE_SELECTED;
    }
  }

  public selectShape(index:number):void{
    this.shapes[index].selected = true;
  }
  public resizeShape(index:number,oldBox:IBox,newBox:IBox, fixed:string){
    let fixedX,fixedY;
    if(fixed === TOP_RIGHT_CORNER){
      fixedX = oldBox.x2;
      fixedY = oldBox.y1;
    }else if(fixed === TOP_LEFT_CORNER){
      fixedX = oldBox.x1;
      fixedY = oldBox.y1;
    }else if(fixed === BOTTOM_LEFT_CORNER){
      fixedX = oldBox.x1;
      fixedY = oldBox.y2;
    }else if(fixed === BOTTOM_RIGHT_CORNER){
      fixedX = oldBox.x2;
      fixedY = oldBox.y2;
    }else{
      return;
    }
    const Sx = (newBox.x2 - newBox.x1)/(oldBox.x2 - oldBox.x1);
    const Sy = (newBox.y2 - newBox.y1)/(oldBox.y2 - oldBox.y1);
    this.shapes[index] = this.shapes[index].resize(fixedX,fixedY,Sx,Sy);
  }
  public moveShape(index:number,x1:number,y1:number,x2:number,y2:number):void{
    this.shapes[index] = this.shapes[index].move(x1,y1,x2,y2);
  }
  public unSelectShape(index:number):void{
    this.shapes[index].selected = false;
  }

  public getContent(): Shape[] {
    return this.shapes;
  }

  public setContent(shapes: Shape[]): void {
    this.shapes = shapes;
  }

  public deleteShape(index){
    this.shapes.splice(index,1);
  }
}

export default Board;