
interface IPencilOption{
    color?: string 
    thickness?: number 
}

interface IPencilToolState{
    color:string,
    thickness:number
}

interface IPencilToolAction{
    type: string,
    payload: IPencilOption
}