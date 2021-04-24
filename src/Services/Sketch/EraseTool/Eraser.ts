import Board from "../Board/Board";

export default class Eraser{
    private board:Board;
    private pointsShape;
    constructor(board:Board){
        this.board = board;
        this.init();
    }
    public init(){
        this.pointsShape = {};
        const shapes = this.board.getContent();
        for(let i = 0; i < shapes.length; i++){
            for(let pos of shapes[i].positions){
                let x = Math.round(pos.x);
                let y = Math.round(pos.y);
                if(!this.pointsShape[x]){
                    this.pointsShape[x] = {};
                }
                this.pointsShape[x][y] = i;
            }
        }
    }
    public eraseShape(x:number,y:number){
        console.log(this.pointsShape);
        // x = Math.abs(x);
        // y = Math.abs(y);
        if(this.pointsShape[x] && this.pointsShape[x][y]){
            console.log(x,y);

            this.board.deleteShape(this.pointsShape[x][y]);
            this.init();
        }
    }
}