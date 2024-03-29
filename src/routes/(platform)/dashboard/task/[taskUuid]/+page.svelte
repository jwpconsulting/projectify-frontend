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
    import { _, number } from "svelte-i18n";

    import Breadcrumbs from "$lib/figma/screens/task/Breadcrumbs.svelte";
    import Fields from "$lib/figma/screens/task/Fields.svelte";
    import Layout from "$lib/figma/screens/task/Layout.svelte";
    import ReadSubTasks from "$lib/figma/screens/task/ReadSubTasks.svelte";
    import TaskDescription from "$lib/figma/screens/task/TaskDescription.svelte";
    import TaskDueDate from "$lib/figma/screens/task/TaskDueDate.svelte";
    import TaskLabel from "$lib/figma/screens/task/TaskLabel.svelte";
    import TaskTitle from "$lib/figma/screens/task/TaskTitle.svelte";
    import TaskUser from "$lib/figma/screens/task/TaskUser.svelte";
    import TopBar from "$lib/figma/screens/task/TopBar.svelte";
    import Button from "$lib/funabashi/buttons/Button.svelte";
    import SquovalIcon from "$lib/funabashi/buttons/SquovalIcon.svelte";
    import { currentTask } from "$lib/stores/dashboard";
    import { openContextMenu } from "$lib/stores/globalUi";
    import {
        getDashboardWorkspaceBoardSectionUrl,
        getDashboardWorkspaceBoardUrl,
        getTaskEditUrl,
        getTaskUrl,
    } from "$lib/urls";
    import { coerceIsoDate } from "$lib/utils/date";

    import type { PageData } from "./$types";

    import { goto } from "$app/navigation";

    export let data: PageData;

    $: task = $currentTask ?? data.task;
    $: subTasks = task.sub_tasks;
    $: workspaceBoardSection = task.workspace_board_section;
    $: workspaceBoard = workspaceBoardSection.workspace_board;

    let contextMenuRef: HTMLElement;

    async function onInteract() {
        await goto(getTaskEditUrl(task.uuid));
    }

    $: crumbs = [
        {
            label: workspaceBoard.title,
            href: getDashboardWorkspaceBoardUrl(workspaceBoard.uuid),
        },
        {
            label: workspaceBoardSection.title,
            href: getDashboardWorkspaceBoardSectionUrl(
                workspaceBoardSection.uuid,
            ),
        },
        { label: $number(task.number), href: getTaskUrl(task.uuid) },
    ];
</script>

<Layout>
    <TopBar slot="top-bar" {workspaceBoardSection}>
        <Breadcrumbs slot="breadcrumbs" {crumbs} />
        <svelte:fragment slot="buttons">
            <Button
                grow={false}
                color="blue"
                size="small"
                style={{ kind: "primary" }}
                label={$_("task-screen.edit")}
                action={{ kind: "a", href: getTaskEditUrl(task.uuid) }}
            />
            <div bind:this={contextMenuRef}>
                <SquovalIcon
                    icon="dotsVertical"
                    state="active"
                    action={{
                        kind: "button",
                        action: openContextMenu.bind(
                            null,
                            {
                                kind: "task",
                                task,
                                location: "task",
                                workspaceBoardSection,
                            },
                            contextMenuRef,
                        ),
                    }}
                />
            </div>
        </svelte:fragment>
    </TopBar>
    <svelte:fragment slot="content">
        <Fields>
            <TaskTitle slot="title" title={task.title} readonly {onInteract} />
            <TaskUser
                slot="assignee"
                workspaceUser={task.assignee}
                {onInteract}
            />
            <TaskLabel
                slot="labels"
                labels={task.labels}
                {onInteract}
                readonly
            />
            <TaskDueDate
                slot="due-date"
                dueDate={task.due_date && coerceIsoDate(task.due_date)}
                readonly
                {onInteract}
            />
            <TaskDescription
                slot="description"
                readonly
                description={task.description}
                {onInteract}
            />
        </Fields>
        <ReadSubTasks {subTasks} {onInteract} />
    </svelte:fragment>
</Layout>
