import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import Task from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        // removeTask: action('removeTask'),
        // changeTaskStatus: action('changeTaskStatus'),
        // changeTaskTitle: action('changeTaskTitle')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [isDone, setIsDone] = useState(false);
    const changeTaskStatus = () => setIsDone(!isDone);
    return <Task
        id={'111'}
        title='HTML'
        isDone={isDone}
        removeTask={action('removeTask')}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={action('changeTaskTitle')}/>;
}

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {

};
