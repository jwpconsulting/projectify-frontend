import type { Meta, StoryObj } from "@storybook/svelte";

import MenuButton from "$lib/figma/cards/task-card/MenuButton.svelte";

import { task } from "$lib/storybook";

const meta: Meta<MenuButton> = {
    component: MenuButton,
    argTypes: {},
};
export default meta;

type Story = StoryObj<MenuButton>;

export const Default: Story = {
    args: {
        task,
    },
};