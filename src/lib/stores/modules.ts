import { writable } from "svelte/store";
import { createLabel as repositoryCreateLabel } from "$lib/repository/workspace";
import {
    createLabelSearchResults,
    currentWorkspaceLabels,
} from "$lib/stores/dashboard";
import type { Workspace, Task } from "$lib/types/workspace";

import type { LabelSearchModule } from "$lib/types/stores";
import type { LabelSelection, LabelSelectionInput } from "$lib/types/ui";

export function createLabelSearchModule(
    workspace: Workspace,
    task: Task | null,
    selectCallback: (labelUuid: string, selected: boolean) => void
): LabelSearchModule {
    const labelSelected: LabelSelection =
        task && task.labels && task.labels.length > 0
            ? {
                  kind: "labels",
                  labelUuids: new Set(task.labels.map((l) => l.uuid)),
              }
            : { kind: "noLabel" };
    const search = writable("");
    const selectOrDeselectLabel = (
        select: boolean,
        labelSelectionInput: LabelSelectionInput
    ) => {
        const { kind } = labelSelectionInput;
        if (kind === "noLabel") {
            console.error("No API for removing all labels");
            throw new Error("TODO");
        } else if (kind === "allLabels") {
            // XXX Clearly, allLabels only makes sense for side nav, not when
            // assigning labels to tasks
            console.error("No API for assigning all labels");
            throw new Error("TODO");
        } else {
            const { labelUuid } = labelSelectionInput;
            selectCallback(labelUuid, select);
        }
    };
    return {
        select: (labelSelectionInput: LabelSelectionInput) => {
            selectOrDeselectLabel(true, labelSelectionInput);
        },
        deselect: (labelSelectionInput: LabelSelectionInput) => {
            selectOrDeselectLabel(false, labelSelectionInput);
        },
        selected: writable<LabelSelection>(labelSelected),
        search,
        searchResults: createLabelSearchResults(
            currentWorkspaceLabels,
            search
        ),
        async createLabel(color: number, name: string) {
            await repositoryCreateLabel(workspace, name, color);
        },
    };
}