import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";


export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks('0bffade1-a9a3-414e-8129-b82a0554ae05')
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "NEW!!!";
        let id = '0bffade1-a9a3-414e-8129-b82a0554ae05';
        tasksAPI.createTask(id,title).then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '0bffade1-a9a3-414e-8129-b82a0554ae05';
        let taskId = 'b501c9be-0e56-4b8d-ad54-d31ca6ab8a7c';
        tasksAPI.deleteTask(todolistId,taskId).then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "0bffade1-a9a3-414e-8129-b82a0554ae05";
        let title = "UPDATE!!!"
        let taskId= "ec205647-9e2c-4b9f-b82c-3bee5c2d9cb8"
        tasksAPI.updateTask(todolistId, taskId, title).then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
