import { CHANGE_SELECTED_TOOL, CLOSE_SUB_OPTIONS } from "../types";

export const selectTool = (option : IToolsOption) => ({
    type:CHANGE_SELECTED_TOOL,
    payload: option
})

export const closeSubOptions = () => ({
    type:CLOSE_SUB_OPTIONS
})