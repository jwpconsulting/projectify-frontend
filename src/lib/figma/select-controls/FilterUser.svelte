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
    // TODO rename FilterWorkspaceUser
    import { _ } from "svelte-i18n";

    import AvatarVariant from "$lib/figma/navigation/AvatarVariant.svelte";
    import Checkbox from "$lib/funabashi/select-controls/Checkbox.svelte";
    import type { WorkspaceUserSelectionInput } from "$lib/types/ui";
    import { getDisplayName } from "$lib/types/user";

    export let workspaceUserSelectionInput: WorkspaceUserSelectionInput;
    export let active: boolean;
    export let count: number | undefined;

    export let onSelect: () => void;
    export let onDeselect: () => void;

    $: showCount = count !== undefined;

    function click() {
        active = !active;
        if (active) {
            onSelect();
        } else {
            onDeselect();
        }
    }
</script>

<button
    class="group flex w-full flex-row justify-between px-5 py-2 hover:bg-background"
    on:click={click}
>
    <div class="flex min-w-0 flex-row items-center gap-2">
        <div class="shrink-0">
            <Checkbox
                checked={active}
                disabled={false}
                contained={true}
                {onSelect}
                {onDeselect}
            />
        </div>
        <div class="flex min-w-0 flex-row items-center gap-2">
            {#if workspaceUserSelectionInput.kind === "workspaceUser"}
                <AvatarVariant
                    content={{
                        kind: "single",
                        user: workspaceUserSelectionInput.workspaceUser.user,
                    }}
                    size="small"
                />
            {:else}
                <AvatarVariant
                    content={{
                        kind: "single",
                    }}
                    size="small"
                />
            {/if}
            <div class="text-regular min-w-0 truncate text-sm">
                {#if workspaceUserSelectionInput.kind === "unassigned"}
                    {$_("filter-workspace-user.assigned-nobody")}
                {:else if workspaceUserSelectionInput.kind === "allWorkspaceUsers"}
                    {$_("filter-workspace-user.all-users")}
                {:else if workspaceUserSelectionInput.kind === "workspaceUser"}
                    {getDisplayName(
                        workspaceUserSelectionInput.workspaceUser.user,
                    )}
                {/if}
            </div>
        </div>
    </div>
    <div
        class="flex shrink-0 flex-row items-center gap-2 rounded-2.5xl border border-primary bg-foreground px-2 py-0.5 text-sm font-bold text-primary {showCount
            ? 'hover:visible group-hover:visible'
            : ''}"
        class:invisible={!active}
        class:visible={active}
    >
        {count ?? ""}
    </div>
</button>
