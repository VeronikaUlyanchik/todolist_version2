import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

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
const initialState: Array<TodolistType> = [];
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

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
