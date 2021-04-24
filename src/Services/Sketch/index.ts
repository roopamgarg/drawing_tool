import { ERASER_TOOL } from './../../Constants/tools';
import { WHITE } from "../../Constants/colors";
import { PENCIL_TOOL, SELECTION_TOOL } from "../../Constants/tools";
import { numberToPercentage } from "../helpers";
import { toolsState } from "../State";
import Board from "./Board/Board";
import History from "./Board/History";
import Pencil from "./PencilTool/Pencil";
import Select from "./SelectTool/Selection";
import Eraser from './EraseTool/Eraser';

class Sketch {
  private board: Board;
  private boardHistory: History;
  private select: Select;
  private pencil: Pencil;
  private eraser: Eraser;
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.boardHistory = new History();
    this.width = width;
    this.height = height;
    this.board = new Board(width,height);    
    this.select = new Select(this.board,width,height);
    this.pencil = new Pencil(width,height);
    this.eraser = new Eraser(this.board);
  }

  private drawGrid = (p5: any) => {
    let curY = 0;
    let curX = 0;
    p5.strokeWeight(0.05);
    p5.stroke(0);
    while (curX < this.width) {
      p5.beginShape();
      p5.line(curX, 0, curX, this.height);
      curX += 100;
      p5.endShape();
    }
    while (curY < this.height) {
      p5.beginShape();
      p5.line(0, curY, this.width, curY);
      curY += 100;
      p5.endShape();
    }
  };
  private undoDrawing(): void {
    this.board.restore(this.boardHistory.undo());
  }
  private redoDrawing(): void {
    this.board.restore(this.boardHistory.redo());
  }

  public handleMousePressed(p5: any) {
    switch (toolsState().selectedTool) {
      case PENCIL_TOOL:
        this.pencil.start_drawing();
        break;
      case SELECTION_TOOL:
        this.select.start(p5.mouseX, p5.mouseY);
        break;
      case ERASER_TOOL:
        this.eraser.init()
        break;
      default:
        break;
    }
  }
  public handleMouseReleased(p5: any) {
      
    switch (toolsState().selectedTool) {
      case PENCIL_TOOL:
        this.board.setContent([...this.board.getContent(), this.pencil.getCurrentShape()]);
        this.boardHistory.push(this.board.createState());
        this.pencil.clearCurrentShape();
        break;
      case SELECTION_TOOL:
        this.board.setContent([...this.board.getContent()]);
        this.boardHistory.push(this.board.createState());
        this.select.end(p5.mouseX, p5.mouseY);
        this.select.selectShapes();        
        break;
      
      default:
        break;
    }
  }

  public handleKeyPressed(p5) {
    if (p5.keyIsDown(p5.CONTROL) && p5.key == "z") {
      this.undoDrawing();
    } else if (p5.keyIsDown(p5.CONTROL) && p5.key == "y") {
      this.redoDrawing();
    }
  }
  public handleDragging(p5){
    switch(toolsState().selectedTool){
      case SELECTION_TOOL:
        //console.log(`drag x1 = ${p5.mouseX} ${numberToPercentage(p5.mouseX,this.width)}%, y1 = ${p5.mouseY} ${numberToPercentage(p5.mouseY,this.height)}%`)
        this.select.drag(p5.mouseX,p5.mouseY);
        break;
      case ERASER_TOOL:
        this.eraser.eraseShape(p5.mouseX,p5.mouseY);
        break;
    }
  }
  public draw(p5) {
    p5.background(WHITE);
    this.drawGrid(p5);
    if (p5.mouseIsPressed) {
      if (p5.mouseButton == p5.LEFT) {
        switch (toolsState().selectedTool) {
          case PENCIL_TOOL:
            this.pencil.addPoints(p5.mouseX,p5.mouseY);
            break;
          case SELECTION_TOOL:
            this.select.end(p5.mouseX, p5.mouseY);
            this.select.draw(p5);
            break;
          default:
            break;
        }
      }
    }
    for (let shape of this.board.getContent()) {
      this.pencil.draw(p5, shape);
    }
    this.pencil.draw(
      p5,
      this.pencil.getCurrentShape(),
    );
    p5.strokeWeight(1);
    p5.text(`${numberToPercentage(p5.mouseX,this.width)} ${numberToPercentage(p5.mouseY,this.height)}`, p5.mouseX, p5.mouseY);
    if(toolsState().selectedTool == SELECTION_TOOL){
      this.select.draw(p5);
    }else if(toolsState().selectedTool == PENCIL_TOOL){
      p5.cursor("default")
    }
  }
}

export const setupBoard = (width, height, settings) => {
  const sketch: Sketch = new Sketch(width, height);
  function setup(p5, canvasParentRef) {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.noFill();
  }
  function mousePressed(p5) {
    sketch.handleMousePressed(p5);
  }
  function mouseReleased(p5) {
    sketch.handleMouseReleased(p5);
  }
  function mouseDragged(p5) {
    sketch.handleDragging(p5);
  }
  function keyPressed(p5) {
      
    sketch.handleKeyPressed(p5);
  }
  function draw(p5) {
    sketch.draw(p5);
  }
  return {
    setup: setup,
    draw: draw,
    mouseReleased: mouseReleased,
    mousePressed: mousePressed,
    keyPressed: keyPressed,
    mouseDragged: mouseDragged,
  };
};
