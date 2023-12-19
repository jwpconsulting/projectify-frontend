<script lang="ts">
    import Boards from "$lib/figma/navigation/side-nav/Boards.svelte";
    import FilterLabels from "$lib/figma/navigation/side-nav/FilterLabels.svelte";
    import FilterWorkspaceUsers from "$lib/figma/navigation/side-nav/FilterWorkspaceUsers.svelte";
    import WorkspaceSelector from "$lib/figma/navigation/side-nav/WorkspaceSelector.svelte";
    import { showFilters } from "$lib/stores/dashboard";
    import type { Workspace } from "$lib/types/workspace";

    export let workspaces: Workspace[];
    export let workspace: Workspace;
</script>

<nav class="flex flex-col gap-4 px-4 py-4">
    <WorkspaceSelector {workspaces} {workspace} open={true} />
    <div class="flex shrink flex-col gap-3 overflow-x-auto overflow-y-scroll">
        <Boards {workspace} />
        {#if $showFilters}
            <FilterWorkspaceUsers />
            <FilterLabels />
        {/if}
    </div>
</nav>
