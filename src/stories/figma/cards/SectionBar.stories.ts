import type { Meta, StoryObj } from "@storybook/svelte";

import SectionBar from "$lib/figma/cards/SectionBar.svelte";

import {
    createMoveTaskModule,
    mobileParameters,
    workspaceBoardSection,
} from "$lib/storybook";

const meta: Meta<SectionBar> = {
    component: SectionBar,
    argTypes: {},
    args: {
        workspaceBoardSection,
        createMoveTaskModule,
        switchWithPrevSection: console.error,
        switchWithNextSection: console.error,
    },
};
export default meta;

type Story = StoryObj<SectionBar>;

export const Default: Story = {};
