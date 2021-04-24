import { Reducer } from "react";
import { SELECTION_TOOL } from "../../Constants/tools";
import { CHANGE_PENCIL_COLOR, CHANGE_PENCIL_THICKNESS, CHANGE_SELECTED_TOOL, CLOSE_SUB_OPTIONS } from "../types";


const pencilToolState: IPencilToolState = {
    color:"#000",
    thickness: 10,
};

const pencilReducer = (state: IPencilToolState = pencilToolState, action: IPencilToolAction ) => {
    switch(action.type){
        case CHANGE_PENCIL_COLOR:
            return {
                ...state,
                color:action.payload.color,
            }
        case CHANGE_PENCIL_THICKNESS:
            return {
                ...state,
                thickness:action.payload.thickness,
            }
        default:
            return state;
    }
}

export default pencilReducer;