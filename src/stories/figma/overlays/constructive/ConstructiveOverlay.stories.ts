import type { Meta, StoryObj } from "@storybook/svelte";

import { constructiveOverlays } from "../config";

import ConstructiveOverlay from "$lib/figma/overlays/constructive/ConstructiveOverlay.svelte";

const meta: Meta<ConstructiveOverlay> = {
    component: ConstructiveOverlay,
    argTypes: {
        target: constructiveOverlays,
    },
    args: {
        target: "update-workspace-board",
    },
};
export default meta;

type Story = StoryObj<ConstructiveOverlay>;

export const Default: Story = {};