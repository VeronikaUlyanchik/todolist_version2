import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBoxOutlined} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    };

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    };
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddItem();
    };

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeSetTitle} //input.value
                onKeyPress={onKeyPressAddItem}
                variant = {'outlined'}
                label = {'title'}
                size ={'small'}
                error={error}
                helperText ={error && "Title is required!" }
            />
            <IconButton
                onClick={onClickAddItem}>
                <AddBoxOutlined/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;