import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, addTaskAC} from "./store/tasks-reducer";
// C
// R
// U
// D
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const AppWithReducer = () => {
    // BLL:

    const todolistId_1 = v1();
    const todolistId_2 = v1();
    const todolistId_3 = v1();

    const [todolist, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todolistId_1, title: "What to learn", filter: 'all'},
        {id: todolistId_2, title: "What to buy", filter: 'all'},
        {id: todolistId_3, title: "What to read", filter: 'all'},
    ]);


    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
        ],
        [todolistId_2]: [{id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Cheese", isDone: true},
        ],
        [todolistId_3]: [{id: v1(), title: "JS for children", isDone: true},
            {id: v1(), title: "Understanding Redux", isDone: false},
            {id: v1(), title: "Crime and punishment", isDone: true},
        ],
    });


    const removeTask = (taskID: string, todoListId: string) => {
        let action = removeTaskAC(taskID,todoListId)
        dispatchToTasks(action)
    }
    const addTask = (title: string, todoListId: string) => {
        let action = addTaskAC(title, todoListId)
        dispatchToTasks(action)

    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskID, isDone, todoListId);
        dispatchToTasks(action)
    };

    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListId))
    };


    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistFilterAC(filter, todoListId))
    };
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistTitleAC(title,todoListId))
    };
    const getTasksForRender = (todolist: TodolistType) => {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }
    }
    const removeTodolist = (todoListId: string) => {
        let action = RemoveTodolistAC(todoListId);
        dispatchToTodolist(action)
        dispatchToTasks(action)
    };
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title);
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }
    const todolistForComponents = todolist.map(tl => {
        const tasksForRender = getTasksForRender(tl);
        return (
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '20px'}}>
                    <TodoList
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForRender}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        removeTodolist={removeTodolist}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>)
    });


    // UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "25px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={6} justifyContent={'space-around'}>
                    {todolistForComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
