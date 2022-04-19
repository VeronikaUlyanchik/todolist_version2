import React, {FC} from 'react';
// import Button from "./Button";
import {FilterValuesType} from "./App";
import {ButtonGroup, Button} from "@material-ui/core";

type ButtonsBlockPropsType = {
    filter: FilterValuesType
    setFilterValue: (filter: FilterValuesType) => () => void
}
export const ButtonsBlock: FC<ButtonsBlockPropsType> = (
    {filter, setFilterValue}
) => {
    return (
        <ButtonGroup
            variant = {'contained'}
            size={"small"} fullWidth
        >
            <Button color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={setFilterValue('all')}
            >all</Button>
            <Button color={filter === 'active' ? 'secondary' : 'primary'} onClick={setFilterValue('active')}>active</Button>
            <Button color={filter === 'completed' ? 'secondary' : 'primary'} onClick={setFilterValue('completed')}>completed</Button>
            {/*<Button*/}
            {/*    active={filter === "all"}*/}
            {/*    title={"All"}*/}
            {/*    onClickHandler={setFilterValue('all')}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    active={filter === "active"}*/}
            {/*    title={"Active"}*/}
            {/*    onClickHandler={setFilterValue('active')}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    active={filter === "completed"}*/}
            {/*    title={"Completed"}*/}
            {/*    onClickHandler={setFilterValue('completed')}*/}
            {/*/>*/}
        </ButtonGroup>
    );
};

