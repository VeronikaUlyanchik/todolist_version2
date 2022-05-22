import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./Components/Todolist/TodoList";
import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    changeTitleTodoListThunk,
    ChangeTodolistFilterAC,
    createTodoListThunk, deleteTodoListThunk, fetchTodoListsThunk,
} from "./store/todolists-reducer";
import {
    removeTaskThunk,
    addTaskThunk, updateTitleTaskThunk, updateStatusTaskThunk
} from "./store/tasks-reducer";
import {AppRootStateType} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {TaskType} from "./api/tasks-api";



export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const App = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
      dispatch(fetchTodoListsThunk())
    }, [])

    const tasks= useSelector<AppRootStateType,TasksStateType>(state => state.tasks);
    const todolist= useSelector<AppRootStateType,Array<TodolistType>>(state => state.todoLists);

    const removeTask = useCallback((taskID: string, todoListId: string) => {
        dispatch(removeTaskThunk(taskID, todoListId))
    }, [dispatch]);

    const addTask = useCallback( (title: string, todoListId: string) => {
        dispatch(addTaskThunk(title, todoListId))
    },[dispatch]);

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {
        dispatch(updateStatusTaskThunk(todoListId,taskID, {completed: isDone}))
    },[]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId: string) => {
        dispatch(updateTitleTaskThunk(todoListId, taskID, {title}))
    },[]);

    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(filter, todoListId))
    },[dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTitleTodoListThunk(title,todoListId))
    },[dispatch]);

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(deleteTodoListThunk(todoListId))
    },[dispatch]);

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListThunk(title))
    }, [dispatch]);

    const todolistForComponents = todolist.map(tl => {
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

export default App;
