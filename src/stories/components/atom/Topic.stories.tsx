
import { Topic as Topic_S } from '../../../components/atom/Topic';
import { ComponentStory, ComponentMeta } from '@storybook/react';



export default {
  title: 'Tesst',
  component: Topic_S,
} as ComponentMeta<typeof Topic_S>;


const Template: ComponentStory<typeof Topic_S> = (args) => <Topic_S {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'test',
    status:'プレイ中',
};