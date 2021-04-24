import { store } from "../../redux/store";


export const pencilState = () => store.getState().pencilTool;
export const toolsState = () => store.getState().tools;
