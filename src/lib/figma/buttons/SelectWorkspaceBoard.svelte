<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!--
    Copyright (C) 2023 JWP Consulting GK

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<script lang="ts">
    // TODO Rename figma/navigation/side-nav/SelectWorkspaceBoard.svelte
    import { Folder } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    import CircleIcon from "$lib/funabashi/buttons/CircleIcon.svelte";
    import {
        currentWorkspaceBoard,
        selectWorkspaceBoardUuid,
    } from "$lib/stores/dashboard";
    import { openContextMenu } from "$lib/stores/globalUi";
    import type { Workspace, WorkspaceBoard } from "$lib/types/workspace";
    import { getDashboardWorkspaceBoardUrl } from "$lib/urls";

    // Hehe, apparently this IS necessary, because $currentWorkspaceBoard
    // is evaluated despite the subscription never returning a value!
    // That is a sveltism, I suppose.
    // XXX TODO
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    $: currentWorkspaceBoardUuid = $currentWorkspaceBoard?.uuid;

    export let workspaceBoard: WorkspaceBoard;
    export let workspace: Workspace;

    let buttonRef: HTMLElement;

    async function toggleMenu() {
        // TODO: When the context menu is open, we should indicate that it
        // belongs to a certain board by highlighting the board in blue (using
        // the hover color)
        await openContextMenu(
            {
                kind: "workspaceBoard",
                workspace,
                workspaceBoard,
            },
            buttonRef,
        );
    }
</script>

<a
    class="group block flex w-full flex-row justify-between px-4 py-1 hover:bg-base-200"
    href={getDashboardWorkspaceBoardUrl(workspaceBoard.uuid)}
    on:click={() =>
        selectWorkspaceBoardUuid(workspace.uuid, workspaceBoard.uuid)}
>
    <div class="flex min-w-0 flex-row items-center gap-2">
        <div
            class={`rounded-md p-1 ${
                workspaceBoard.uuid === currentWorkspaceBoardUuid
                    ? "bg-primary-focus"
                    : ""
            }`}
        >
            <Icon
                src={Folder}
                theme="outline"
                class={`h-4 w-4 ${
                    workspaceBoard.uuid === currentWorkspaceBoardUuid
                        ? "text-base-100"
                        : ""
                }`}
            />
        </div>
        <div class="line-clamp-1 min-w-0 text-sm font-bold">
            {workspaceBoard.title}
        </div>
    </div>
    <div class="invisible group-hover:visible" bind:this={buttonRef}>
        <CircleIcon
            size="small"
            icon="ellipsis"
            action={{ kind: "button", action: toggleMenu }}
        />
    </div>
</a>
