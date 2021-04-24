import { BLACK, BLUE } from "../../../Constants/colors";
import Position from "../Shape/Position";
import Shape from "../Shape/Shape";

class Pencil {
  private current_drawing: Shape;
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.current_drawing = new Shape(width, height);
    this.width = width;
    this.height = height;
  }

  public draw(p5, shape: Shape) {
    p5.stroke(shape.color);
    p5.strokeWeight(shape.thickness);
    p5.noFill();
    p5.beginShape();
    for (let {x,y} of shape.positions) {
      p5.vertex(x, y);
    }
    p5.endShape();

    if (shape.selected) {
      p5.beginShape();
      p5.stroke(BLUE);
      p5.strokeWeight(1);

      let minX = shape.minX;
      let minY = shape.minY;
      let maxX = shape.maxX;
      let maxY = shape.maxY;

      p5.line(minX, minY, maxX, minY);
      p5.line(minX, minY, minX, maxY);
      p5.line(minX, maxY, maxX, maxY);
      p5.line(maxX, minY, maxX, maxY);
      p5.endShape();
    }
  }
  public start_drawing(): void {
    this.current_drawing = new Shape(this.width, this.height);
  }

  public getCurrentShape(): Shape {
    return this.current_drawing;
  }
  public clearCurrentShape(): void {
    this.current_drawing = new Shape(this.width, this.height);
  }

  public addPoints(x: number, y: number): void {
    const point: Position = new Position(x, y, this.width, this.height);
    this.current_drawing.addPositionPoint(point);
    const minX = this.current_drawing.minX;
    const minY = this.current_drawing.minY;
    const maxX = this.current_drawing.maxX;
    const maxY = this.current_drawing.maxY;
    this.current_drawing.minX = Math.min(minX, x);
    this.current_drawing.minY = Math.min(minY, y);
    this.current_drawing.maxX = Math.max(maxX, x);
    this.current_drawing.maxY = Math.max(maxY, y);
  }
}

export default Pencil;
