import React, {useCallback, useEffect} from 'react';
import TodoListHeader from "../TodolistHeader/TodoListHeader";
import Task from "../Task/Task";
import AddItemForm from "../AddItemForm/AddItemForm";
import {ButtonsBlock} from "../ButtonsBlock/ButtonsBlock";
import {List} from "@material-ui/core";
import {FilterValuesType} from "../../App";
import {useDispatch} from "react-redux";
import {fetchTasksThunk} from "../../store/tasks-reducer";
import {TaskType} from "../../api/tasks-api";

type TodoListPropsType = {
    todolistId:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTaskTitle : (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle : (title: string, todoListId: string) =>void
}

const TodoList = React.memo( (props: TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchTasksThunk(props.todolistId))
    },[])


    const getTasksForRender = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.completed)
            case "completed":
                return props.tasks.filter(t => t.completed)
            default:
                return props.tasks
        }
    };

    const tasksComponents = getTasksForRender().map(t => {

        const removeTask = (taskId:string) => {
            props.removeTask(taskId, props.todolistId)
        }
        const changeTaskStatus = (taskID: string, isDone: boolean) => {
          props.changeTaskStatus(taskID,isDone, props.todolistId)
        }
        const changeTaskTitle = (taskID: string, title: string) => {
            props.changeTaskTitle(taskID,title, props.todolistId)
        }

        return (
            <Task
                key={t.id}
                id={t.id}
                title={t.title}
                completed={t.completed}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })


    const setFilterValue = useCallback((filter:FilterValuesType)=> ()=> props.changeFilter(filter,props.todolistId), [props.changeFilter,props.todolistId ])

    const removeTodolist = () => {
      props.removeTodolist(props.todolistId)
    }
    const addTask = useCallback( (title:string) => {
        props.addTask(title, props.todolistId)
    },[props.addTask,props.todolistId ])

    const changeTodoListTitle = useCallback((title:string) => {
      props.changeTodoListTitle(title,props.todolistId)
    },[props.changeTodoListTitle,props.todolistId])

    return (
        <div>
            <TodoListHeader title={props.title} removeTodolist={removeTodolist} changeTodoListTitle={changeTodoListTitle}/>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksComponents}
            </List>
            <div>
                <ButtonsBlock setFilterValue={setFilterValue} filter={props.filter}/>
            </div>
        </div>
    );
});

export default TodoList;