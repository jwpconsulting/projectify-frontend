import type { Meta, StoryObj } from "@storybook/svelte";

import LabelDropdownClosedNav from "$lib/figma/buttons/LabelDropdownClosedNav.svelte";
import { labelSearchModule } from "$lib/storybook";

const meta: Meta<LabelDropdownClosedNav> = {
    component: LabelDropdownClosedNav,
    argTypes: {},
    args: {
        labelSearchModule,
    },
};
export default meta;

type Story = StoryObj<LabelDropdownClosedNav>;

export const Default: Story = {};