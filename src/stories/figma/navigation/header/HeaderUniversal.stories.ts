import type { Meta, StoryObj } from "@storybook/svelte";

import HeaderUniversal from "$lib/figma/navigation/header/HeaderUniversal.svelte";
import { mobileParameters } from "$lib/storybook";

const meta: Meta<HeaderUniversal> = {
    component: HeaderUniversal,
    argTypes: {},
    args: {
        logoVisibleDesktop: true,
        logoVisibleMobile: true,
    },
};
export default meta;

type Story = StoryObj<HeaderUniversal>;

export const Default: Story = {};

export const Mobile: Story = {
    parameters: mobileParameters,
};