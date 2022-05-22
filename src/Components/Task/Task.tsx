import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {IconButton, ListItem} from "@material-ui/core";
import {Checkbox} from "@material-ui/core";
import {TaskType} from "../../api/tasks-api";


type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo( (
    {
        id,
        title,
        completed,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
    }
) => {
    const onClickRemoveTask = () => removeTask(id);
    const onChangeChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(id, e.currentTarget.checked);
    const onChangeChangeTaskTitle = (title: string) => {
        changeTaskTitle(id, title)
    };
    return (
        <ListItem>
        <span className={completed ? "is-done" : ""}>
            <Checkbox
                size={'small'} onChange={onChangeChangeTaskStatus}
                checked={completed}/>
            <EditableSpan title={title} changeTitle={onChangeChangeTaskTitle}/>
            <IconButton
                onClick={onClickRemoveTask}>
                <DeleteOutline/>
            </IconButton>
        </span>
        </ListItem>
    );
});

export default Task;
