import { TOP_LEFT_CORNER, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER, TOP_RIGHT_CORNER } from '../../../Constants/cursorPositions';
import {
  UP_LEFT,
  LEFT_UP,
  LEFT_DOWN,
  DOWN_LEFT,
  DOWN_RIGHT,
  RIGHT_DOWN,
  RIGHT_UP,
  UP_RIGHT,
  INSIDE_SELECTED,
} from "../../../Constants/cursorPositions";
import { BLUE } from "../../../Constants/colors";
import Board from "../Board/Board";
import Position from "../Shape/Position";
import Shape from "../Shape/Shape";
import SelectionArea from "./SelectionArea";

const SELECT = "SELECT";
const DRAG = "DRAG";

class Select extends SelectionArea {
  private board: Board;
  private selectedShapes: number[];

  private draggingStartAt: Position;
  private state: string;
  constructor(board: Board, width: number, height: number) {
    super(width, height);
    this.board = board;
    this.selectedShapes = [];
    this.draggingStartAt = new Position(0, 0, width, height);
  }
  
  public start(x: number, y: number): void {
    let x1 = this.x1;
    let y1 = this.y1;
    let x2 = this.x2;
    let y2 = this.y2;
    switch (this.board.getCursorPosition(x1, y1, x2, y2, x, y)) {
      case UP_LEFT:
        this.state = UP_LEFT;
        break;
      case LEFT_UP:
        this.state = LEFT_UP;
        break;
      case LEFT_DOWN:
        this.state = LEFT_DOWN;
        break;
      case DOWN_LEFT:
        this.state = DOWN_LEFT;
        break;
      case DOWN_RIGHT:
        this.state = DOWN_RIGHT;
        break;
      case RIGHT_DOWN:
        this.state = RIGHT_DOWN;
        break;
      case RIGHT_UP:
        this.state = RIGHT_UP;
        break;
      case UP_RIGHT:
        this.state = UP_RIGHT;
        break;
      case INSIDE_SELECTED:
        this.state = DRAG;
        break;
      default:
        this.state = SELECT;
    }
    if (this.state == SELECT) {
      this.x1 = x;
      this.y1 = y;
      this.x2 = x;
      this.y2 = y;
    } else {
      this.draggingStartAt = new Position(x, y, this.width, this.height);
    }
  }

  public end(x: number, y: number): void {
    if (this.state == SELECT) {
      this.x2 = x;
      this.y2 = y;
    }
  }

  public draw(p5: any): void {
    p5.stroke(BLUE);
    p5.strokeWeight(1);
    
    p5.beginShape();
    p5.rectMode(p5.CORNERS);
    let x1 = Math.min(this.x1, this.x2);
    let y1 = Math.min(this.y1, this.y2);
    let x2 = Math.max(this.x1, this.x2);
    let y2 = Math.max(this.y1, this.y2);
    p5.rect(x1, y1, x2, y2);

    switch (this.board.getCursorPosition(x1, y1, x2, y2, p5.mouseX, p5.mouseY)) {
      case UP_LEFT:
        p5.cursor("nwse-resize");
        break;
      case LEFT_UP:
        p5.cursor("nwse-resize");
        break;
      case LEFT_DOWN:
        p5.cursor("nesw-resize");
        break;
      case DOWN_LEFT:
        p5.cursor("nesw-resize");
        break;
      case DOWN_RIGHT:
        p5.cursor("nwse-resize");
        break;
      case RIGHT_DOWN:
        p5.cursor("nwse-resize");
        break;
      case RIGHT_UP:
        p5.cursor("nesw-resize");
        break;
      case UP_RIGHT:
        p5.cursor("nesw-resize");
        break;
      case INSIDE_SELECTED:
        p5.cursor("grab");
        break;
      default:
        p5.cursor("default");
    }
    p5.endShape();
  }


  public drag(x: number, y: number) {
    let sx = this.draggingStartAt.x;
    let sy = this.draggingStartAt.y;
    let fixed = TOP_LEFT_CORNER;
    const oldBox: IBox = {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2
    }
    if (this.state === DRAG) {
      for (let i = 0; i < this.selectedShapes.length; i++) {
        this.board.moveShape(this.selectedShapes[i], sx, sy, x, y);
      }
    } else if (this.state === RIGHT_DOWN || this.state == DOWN_RIGHT) {
      const dx = x - sx;
      const dy = y - sy;
      fixed = TOP_LEFT_CORNER;
      this.x2 += dx;
      this.y2 += dy;
    } else if (this.state == UP_LEFT || this.state == LEFT_UP) {
      const dx = x - sx;
      const dy = y - sy;
      fixed = BOTTOM_RIGHT_CORNER;
      this.x1 += dx;
      this.y1 += dy;

    } else if (this.state == UP_RIGHT || this.state == RIGHT_UP) {
      const dx = x - sx;
      const dy = y - sy;
      fixed = BOTTOM_LEFT_CORNER;
      this.x2 += dx;
      this.y1 += dy;
    } else if (this.state == LEFT_DOWN || this.state == DOWN_LEFT) {
      const dx = x - sx;
      const dy = y - sy;
      fixed = TOP_RIGHT_CORNER;
      this.x1 += dx;
      this.y2 += dy;
    }
    const newBox: IBox = {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2
    }
    for(let idx of this.selectedShapes){
      this.board.resizeShape(idx,oldBox,newBox,fixed);
    }
    this.draggingStartAt.x = x;
    this.draggingStartAt.y = y;
  }
  private resizeSelectedArea(){
    const shapes: Shape[] = this.board.getContent();

    this.x1 = this.width;
    this.y1 = this.height;
    this.x2 = 0;
    this.y2 = 0;
    
    for (let cur of this.selectedShapes) {
      const x1 = shapes[cur].minX;
      const y1 = shapes[cur].minY;
      const x2 = shapes[cur].maxX;
      const y2 = shapes[cur].maxY;
      this.x1 = Math.min(this.x1, x1);
      this.y1 = Math.min(this.y1, y1);
      this.x2 = Math.max(this.x2, x2);
      this.y2 = Math.max(this.y2, y2);
    }
  }
  public selectShapes() {
    const shapes: Shape[] = this.board.getContent();
    this.selectedShapes = [];
    for (let i = 0; i < shapes.length; i++) {
      const x1 = shapes[i].minX;
      const y1 = shapes[i].minY;
      const x2 = shapes[i].maxX;
      const y2 = shapes[i].maxY;
      if (this.isPointInside(x1, y1) && this.isPointInside(x2, y2)) {
        this.board.selectShape(i);
        this.selectedShapes.push(i);
      } else {
        this.board.unSelectShape(i);
      }
    }
    this.resizeSelectedArea();
  }
}

export default Select;
