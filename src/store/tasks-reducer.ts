import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodoListsACType} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";

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

export type GetTasksACType = ReturnType<typeof getTasksAC>

const initialState: TasksStateType = {};

export type ActionType = removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodoListsACType
    | GetTasksACType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLIST":
            const state1 = {...state}
            action.todoLists.forEach(t => {
                return state1[t.id] = []
            })
            return state1
        case 'GET-TASKS':
            const stateCopy = {...state}
            stateCopy[action.todolistID] = action.tasks
            return stateCopy
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, completed: false , status: TaskStatuses.New, todoListId:action.todolistID, priority: TaskPriorities.Low}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.status
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
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
    return {type: "CHANGE-TASK-TITLE", taskID, title, todolistID,}
}

export const getTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {type: "GET-TASKS", tasks, todolistID,} as const
}

export const fetchTasksThunk = (todolistId:string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(getTasksAC(todolistId, res.data.items))
        )
}

export const removeTaskThunk = (taskId: string, todolistId:string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId ,taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId))
        )
}

export const addTaskThunk = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todoListId ,title)
        .then(res => dispatch(addTaskAC(title, todoListId))
        )
}

export const updateTitleTaskThunk = (todolistId:string, taskId: string, changes: {title:string}) => (dispatch: Dispatch) => {
    tasksAPI.updateTask(todolistId ,taskId, changes)
        .then(res => dispatch(changeTaskTitleAC(taskId, changes.title, todolistId))
        )
}
export const updateStatusTaskThunk = (todolistId:string, taskId: string, changes:{completed:boolean}) => (dispatch: Dispatch) => {
    tasksAPI.updateTask(todolistId ,taskId, changes)
        .then(res => dispatch(changeTaskStatusAC(taskId, changes.completed, todolistId))
        )
}

