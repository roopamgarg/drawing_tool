import { combineReducers } from "redux"
import tools from "../Tools/toolsReducers";
import pencilReducer from "../PencilTool/PencilToolReducers";


export const rootReducer = combineReducers<IApplcationState>({
    tools:tools,
    pencilTool:pencilReducer,
})

