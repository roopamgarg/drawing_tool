
interface IToolsOption{
    tool: string // "SELECTION_TOOL" | "PENCIL_TOOL" | "ERASER_TOOL" | "SHAPES_TOOL" | "UPLOAD_TOOL"
}

interface IToolsState{
    selectedTool: string,
    showSubOptions:boolean
}

interface IToolsAction{
    type: string,
    payload: IToolsOption
}


interface ITool {
    name: string,
    icon: any
    type: string,
    options?: any
}