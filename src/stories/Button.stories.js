import MyButton from './Button.vue';

// import ButtonDefault from '../components/button/ButtonDefault.vue';

// console.log(ButtonDefault);

import { targetPathDetect } from '@/utils.js';
console.log(targetPathDetect);

export default {
  title: 'Example/Button',
  component: MyButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @onClick="onClick" v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};


// const DefaultButtonTemplate = (args, {argTypes}) => {
//     return {
//         props: Object.keys(argTypes),
//         component : {ButtonDefault},
//         template: '<ButtonDefault>hey</ButtonDefault>',
//     }
// }

// export const DefaultButton = DefaultButtonTemplate.bind({});
// DefaultButton.args = {
//     test : 'hey',
// }