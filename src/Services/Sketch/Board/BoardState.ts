import Shape from "../Shape/Shape";

class BoardState {
    private shapes: Shape[];
    constructor(shapes: Shape[]) {
      this.shapes = shapes;
    }
  
    /**
     * getContent
     */
    public getContent(): Shape[] {
      return this.shapes;
    }
  }
  
  export default BoardState;
  