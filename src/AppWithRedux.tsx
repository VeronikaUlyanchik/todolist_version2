import React, {useCallback, useReducer, useState} from 'react';
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
import {AppRootStateType} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
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
const AppWithRedux = () => {
    // BLL:

    const tasks= useSelector<AppRootStateType,TasksStateType>(state => state.tasks);
    const todolist= useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists);
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListId: string) => {
        let action = removeTaskAC(taskID,todoListId)
        dispatch(action)
    }, [dispatch]);

    const addTask = useCallback( (title: string, todoListId: string) => {
        let action = addTaskAC(title, todoListId)
        dispatch(action )
    },[dispatch]);

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskID, isDone, todoListId);
        dispatch(action)
    },[dispatch]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListId))
    },[dispatch]);

    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(filter, todoListId))
    },[dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(title,todoListId))
    },[dispatch]);

    // const getTasksForRender = (todolist: TodolistType) => {
    //
    //     switch (todolist.filter) {
    //         case "active":
    //             return tasks[todolist.id].filter(t => !t.isDone)
    //         case "completed":
    //             return tasks[todolist.id].filter(t => t.isDone)
    //         default:
    //             return tasks[todolist.id]
    //     }
    // };

    const removeTodolist = useCallback((todoListId: string) => {
        let action = RemoveTodolistAC(todoListId);
        dispatch(action)
    },[dispatch, RemoveTodolistAC]);

    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title);
        dispatch(action)
    }, [dispatch]);

    const todolistForComponents = todolist.map(tl => {
        // const tasksForRender = getTasksForRender(tl);
        return (
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '20px'}}>
                    <TodoList
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
