import * as React from 'react';
import { Camera } from '../Camera/Camera';
import { DrawingBoard } from '../DrawingBoard';
import "./_class_room.scss";
export interface IClassRoomProps {
}

export function ClassRoom (props: IClassRoomProps) {
  return (
    <div className="class-room">
        <div className="class-room__board">
            <DrawingBoard/>
        </div>  
        <div className="class-room__right">
            <Camera/>
        </div>
    </div>
  );
}
