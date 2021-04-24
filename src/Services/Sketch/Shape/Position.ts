import { numberToPercentage, percentageToNumber } from "../../helpers";

class Position{
    private _x: number;
    private _y: number;
    private width: number;
    private height: number;
    constructor(x:number, y:number, width:number, height:number){
        this.width = width;
        this.height = height;
        this._x = numberToPercentage(x,this.width);
        this._y = numberToPercentage(y,this.height);
    }
    public set x(value:number){
        this._x = numberToPercentage(value,this.width);
    }
    public get x(){
        return percentageToNumber(this._x,this.width);
    }
    public set y(value:number){
        this._y = numberToPercentage(value,this.height);
    }
    public get y(){
        return percentageToNumber(this._y,this.height);
    }
}

export default Position;