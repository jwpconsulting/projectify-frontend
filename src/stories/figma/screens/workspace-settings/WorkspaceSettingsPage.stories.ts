import type { Meta, StoryObj } from "@storybook/svelte";

import { workspace } from "$lib/storybook";

import { activeSetting } from "./config";

import WorkspaceSettingsPage from "$lib/figma/screens/workspace-settings/WorkspaceSettingsPage.svelte";

const meta: Meta<WorkspaceSettingsPage> = {
    component: WorkspaceSettingsPage,
    argTypes: {
        activeSetting,
    },
    args: { workspace, activeSetting: "index" },
};
export default meta;

type Story = StoryObj<WorkspaceSettingsPage>;

export const Default: Story = {};
