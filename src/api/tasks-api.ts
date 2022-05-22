import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
    'API-KEY': '38b440c3-480d-4d4e-a2c9-675a400878f3'
}})


export const tasksAPI = {
    getTasks(todolistId:string){
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string){
        return instance.post<any, AxiosResponse<CommonResponseType<{items: TaskType[]}>>, {title:string}>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId:string, taskId: string){
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId: string, changes: {title?:string, completed?:boolean}){
        return instance.put<any, AxiosResponse<CommonResponseType>, {title?:string, completed?:boolean}
            >(`/todo-lists/${todolistId}/tasks/${taskId}`, changes)
    }
}


type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}
type GetTasksResponseType={
    items: TaskType[]
    totalCount:number
    error:string
}

export type TaskType = {
    description?: string
    title: string
    completed: boolean
    status?: number
    priority?: number
    startDate?: Date
    deadline?: Date
    id: string
    todoListId?: string
    order?: number
    addedDate?: Date
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


