import type { Meta, StoryObj } from "@storybook/svelte";

import { labelSearchModule } from "$lib/storybook";

import FilterLabelMenu from "$lib/figma/composites/FilterLabelMenu.svelte";

const meta: Meta<FilterLabelMenu> = {
    component: FilterLabelMenu,
    argTypes: {},
    args: {
        labelSearchModule,
        startCreateLabel() {
            console.log("Here we go to the label creation menu");
        },
    },
};
export default meta;

type Story = StoryObj<FilterLabelMenu>;

export const Default: Story = {};