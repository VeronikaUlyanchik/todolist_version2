import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Components/EditableSpan/EditableSpan";


export default {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

  argTypes: {
    changeTitle: {
      description: 'callback'
    },
    title: {
      defaultValue: 'HTML',
      description: "Value of Span"
    },
  },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  changeTitle: action('changeTitle')
};
