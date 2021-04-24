import React,{useEffect, useRef} from 'react';
import Sketch from 'react-p5';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { setupBoard } from '../../Services/Sketch';
import Tools from './Tools';
import "./_drawing_board.scss";
export interface IDrawingBoardProps {

}

export function DrawingBoard(props: IDrawingBoardProps) {
    const { width, height } = useWindowDimensions();
    const boardRef = useRef(null)
    let board = setupBoard(width,height,{});
    useEffect(() => {
        const box_height = boardRef?.current?.clientHeight || height;
        const box_width = boardRef?.current?.clientWidth || width;
        board = setupBoard(box_width,box_height,{});
    })
    return (
        <div ref={boardRef} className="drawing-board">
            <Tools/>
            <Sketch setup={board.setup} mouseDragged={board.mouseDragged} keyPressed={board.keyPressed} draw={board.draw} mousePressed={board.mousePressed} mouseReleased={board.mouseReleased} />
        </div>
    );
}
