import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type removeTaskAT = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}
export type addTaskAT = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    todolistID: string
    status: boolean
}
export type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    todolistID: string
    title: string
}

const initialState: TasksStateType = {};

export type ActionType =
    removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType=initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.status
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistID]: []}
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
};

export const removeTaskAC = (taskID: string, todolistID: string): removeTaskAT => {
    return {type: "REMOVE-TASK", taskID, todolistID,}
}

export const addTaskAC = (title: string, todolistID: string): addTaskAT => {
    return {type: "ADD-TASK", title, todolistID,}
}

export const changeTaskStatusAC = (taskID: string, status: boolean, todolistID: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, status, todolistID,}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE", taskID, title, todolistID,
    }
}

