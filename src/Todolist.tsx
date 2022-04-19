import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from 'react';
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";
import AddItemForm from "./AddItemForm";
import {ButtonsBlock} from "./ButtonsBlock";
import {List} from "@material-ui/core";
import {TodolistType} from "./AppWithRedux";

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

    const getTasksForRender = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
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
                //{...t}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
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