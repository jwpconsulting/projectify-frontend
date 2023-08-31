import { writable } from "svelte/store";

import { getWorkspace } from "$lib/repository/workspace";
import { currentWorkspaceBoard } from "$lib/stores/dashboard/workspaceBoard";
import { createWsStore } from "$lib/stores/util";
import type { Workspace, WorkspaceBoard } from "$lib/types/workspace";

export const currentWorkspaceUuid = writable<string | null>(null);

export const currentWorkspace = createWsStore<Workspace>(
    "workspace",
    currentWorkspaceUuid,
    getWorkspace
);

// TODO see if we can't make this as a derived store Justus 2023-08-30
currentWorkspaceBoard.subscribe(
    ($currentWorkspaceBoard: WorkspaceBoard | null) => {
        if (!$currentWorkspaceBoard) {
            return;
        }
        const { workspace } = $currentWorkspaceBoard;
        if (!workspace) {
            throw new Error("Expected $currentWorkspaceBoard.workspace");
        }
        const { uuid: workspaceUuid } = workspace;
        currentWorkspaceUuid.update(
            ($currentWorkspaceUuid: string | null): string | null => {
                // Is our current workspace uuid already set?
                // Is it equal to the current ws board's id?
                // Apparently, returning the same primitive value in a svelte
                // writable update will suppress subscriber callbacks
                // https://stackoverflow.com/questions/75525283/how-to-cancel-an-update-in-a-svelte-store
                if ($currentWorkspaceUuid == workspaceUuid) {
                    return $currentWorkspaceUuid;
                }
                console.log("Setting workspace UUID to", workspaceUuid);
                return workspaceUuid;
            }
        );
    }
);
