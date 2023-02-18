import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

const buttonStories = {
  title: "ReactComponentLibrary/Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const HelloWorld = Template.bind({});

HelloWorld.args = {
  label: "Hello world!"
}

export const ClickMe = Template.bind({});

ClickMe.args = {
  label: "Click me!"
}

export default buttonStories;