import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
    'API-KEY': '38b440c3-480d-4d4e-a2c9-675a400878f3'
}})


export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title:string){
        return instance.post<any, AxiosResponse<CommonResponseType<{item: TodolistType }>>, {title:string}>('/todo-lists',{title})
    },
    deleteTodolist(id:string){
        return instance.delete<CommonResponseType>(`/todo-lists/${id}`)
    },
    updateTodolistTitle(id:string, title:string){
        return instance.put<any, AxiosResponse<CommonResponseType>, {title:string}>(`/todo-lists/${id}`, {title})
    }
}

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}



