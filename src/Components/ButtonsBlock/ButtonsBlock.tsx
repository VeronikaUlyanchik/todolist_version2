import React, {FC} from 'react';
import {ButtonGroup, Button} from "@material-ui/core";
import {FilterValuesType} from "../../App";

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
        </ButtonGroup>
    );
};

