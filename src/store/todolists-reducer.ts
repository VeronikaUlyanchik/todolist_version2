import { Dispatch } from "redux";
import {v1} from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import {todolistAPI} from "../api/todolist-api";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}
export type SetTodoListsACType = ReturnType<typeof SetTodoListsAC>

const initialState: Array<TodolistType> = [];
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT | SetTodoListsACType

export const todolistsReducer = (todolists: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLIST":
            return action.todoLists.map(t => ({...t, filter:'all'}))
        default:
            return todolists
    }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: "REMOVE-TODOLIST", id}
}

export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: "ADD-TODOLIST", title, todolistID: v1()}
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}
export const SetTodoListsAC = (todoLists: Array<TodolistType>) => {
    return {type: "SET-TODOLIST", todoLists} as const
}

export const fetchTodoListsThunk = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res: any) =>{
        dispatch(SetTodoListsAC(res.data))})
}

export const createTodoListThunk = (title:string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then((res: any) =>{
        dispatch(AddTodolistAC(title))})
}

export const deleteTodoListThunk = (id:string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(id).then((res: any) =>{
        dispatch(RemoveTodolistAC(id))})
}

export const changeTitleTodoListThunk = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todoListId, title).then((res: any) =>{
        dispatch(ChangeTodolistTitleAC(title, todoListId))})
}