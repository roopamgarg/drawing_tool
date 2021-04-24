import * as React from 'react';
import { useSelector } from 'react-redux';
import "./_pencil_tool.scss";
interface IPencilToolProps {
    changeColor: (color: string) => void;
    changeThickness: (thickness:number) => void
}
interface IColorProps {
    color: string;
    changeColor: (color: string) => void;
}

const colors: string[] = [
    "#ffffff",
    "#652CB3",
    "#FEF445",
    "#FAC710",
    "#F24726",
    "#E6E6E6",
    "#CEE741",
    "#8FD14F",
    "#DA0063",
    "#808080",
    "#12CDD4",
    "#0CA789",
    "#9510AC",
    "#1A1A1A",
    "#2D9BF0",
    "#414BB2",
]

function Color({ color, changeColor }: IColorProps) {
    return (
        <div
            className="pencil-tool__color"
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}>

        </div>
    )
}
export default function PencilTool({ changeColor, changeThickness }: IPencilToolProps) {
    const {thickness} = useSelector((state:IApplcationState) => state.pencilTool)
    
    function renderColors() {
        return colors.map(color => (
            <Color changeColor={changeColor} color={color} />
        ))
    }
    function handleThicknessChange(e){
        const value = e.target.value;
        changeThickness(value);
    }
    return (
        <div className="pencil-tool">
            <div className="pencil-tool__slider">
                <input type="range" min="2" max="50" value={thickness} onChange={handleThicknessChange} />
            </div>
            <div className="pencil-tool__colors">
                {renderColors()}
            </div>
        </div>
    );
}
