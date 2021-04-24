import { CHANGE_PENCIL_COLOR, CHANGE_PENCIL_THICKNESS } from "../types";

export const changePencilColor = (payload:IPencilOption) => ({
    type:CHANGE_PENCIL_COLOR,
    payload: payload
})


export const changePencilThickness = (payload:IPencilOption) => ({
    type:CHANGE_PENCIL_THICKNESS,
    payload: payload
})