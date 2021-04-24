import { Reducer } from "react";
import { SELECTION_TOOL } from "../../Constants/tools";
import { CHANGE_SELECTED_TOOL, CLOSE_SUB_OPTIONS } from "../types";


const toolsState: IToolsState = {
    selectedTool:SELECTION_TOOL,
    showSubOptions: false,
};

const reducer = (state: IToolsState = toolsState, action: IToolsAction ) => {
    switch(action.type){
        case CHANGE_SELECTED_TOOL:
            return {
                selectedTool:action.payload.tool,
                showSubOptions:true,
            }
        case CLOSE_SUB_OPTIONS:
            return {
                ...state,
                showSubOptions:false,
            }
        default:
            return state;
    }
}

export default reducer;