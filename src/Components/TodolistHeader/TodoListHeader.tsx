import React from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodoListHeaderPropsType = {
    title: string
    removeTodolist: () => void
    changeTodoListTitle: (newTitle:string)=>void
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = ({title, removeTodolist, changeTodoListTitle}) => {
    return (<h3>
        <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
        <IconButton
            onClick={removeTodolist}>
            <Delete/>
        </IconButton>
        {/*<Button active={false} title={'X'} onClickHandler={removeTodolist}/>*/}
    </h3>);
};

export default TodoListHeader;