import {
    task,
    workspace,
    workspaceBoard,
    workspaceBoardSection,
    workspaceUserAssignment,
    workspaceUser,
    labelAssignment,
    makeStorybookSelect,
} from "$lib/storybook";
import type { ContextMenuType } from "$lib/types/ui";

// Initiating lateral export in 3... 2... 1...
// Reticulating splines...
// Counting backwards from infinity...
export const contextMenus: Record<string, ContextMenuType> = {
    "Profile": {
        kind: "profile" as const,
    },
    "Workspace": {
        kind: "workspace" as const,
        workspaces: [workspace],
    },
    "Side nav": {
        kind: "sideNav" as const,
        workspace,
    },
    "Workspace board": {
        kind: "workspaceBoard" as const,
        workspaceBoard,
    },
    "Workspace board section": {
        kind: "workspaceBoardSection" as const,
        workspaceBoard,
        workspaceBoardSection,
    },
    "Task dashboard": {
        kind: "task" as const,
        task,
        location: "dashboard",
        workspaceBoardSection,
        workspaceBoard: {
            ...workspaceBoard,
            workspace_board_sections: [
                { ...workspaceBoardSection, tasks: [task] },
            ],
            workspace,
        },
    },
    "Task": {
        kind: "task" as const,
        task,
        location: "task",
        workspaceBoardSection,
    },
    "Help": {
        kind: "help",
    },
    "Permissions": {
        kind: "permissions",
    },
    // TODO name of component / kind should be update workspace user assignment?
    // TODO yep, I agree even one month later. Justus 2023-10-19
    "Update workspace user": {
        kind: "updateWorkspaceUser",
        workspaceUserAssignment,
    },
    "Update label": {
        kind: "updateLabel",
        labelAssignment,
    },
};
// Have a nice day!

export const destructiveOverlays = makeStorybookSelect({
    "Delete label": {
        kind: "deleteLabel" as const,
        label: {
            // XSS canary, not that we would ever forget to sanitize our
            // strings, hehehe.
            name: "<marquee>https://owasp.org/www-community/attacks/xss/</marquee>",
            color: 0,
            uuid: "",
        },
    },
    "Delete workspace user": {
        kind: "deleteWorkspaceUser" as const,
        workspaceUser,
    },
    "Delete section": {
        kind: "deleteWorkspaceBoardSection" as const,
        workspaceBoardSection,
    },
    "Delete task": {
        kind: "deleteTask" as const,
        task,
    },
    "Delete selected tasks": {
        kind: "deleteSelectedTasks" as const,
        tasks: [task],
    },
    "Archive board": {
        kind: "archiveWorkspaceBoard" as const,
        workspaceBoard: {
            title: "veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryvery long word",
            created: "",
            modified: "",
            uuid: "",
        },
    },
    "Delete board": {
        kind: "deleteWorkspaceBoard" as const,
        workspaceBoard,
    },
});

export const constructiveOverlays = makeStorybookSelect({
    "Update workspace board": { kind: "updateWorkspaceBoard", workspaceBoard },
    "Create workspace board": { kind: "createWorkspaceBoard", workspace },
    "Invite workspace users": { kind: "inviteWorkspaceUser", workspace },
    "Invite workspace users (error)": {
        kind: "inviteWorkspaceUserError",
        workspace,
    },
    "Create workspace board section": {
        kind: "createWorkspaceBoardSection",
        workspaceBoard,
    },
    "Create workspace": { kind: "createWorkspace" },
    "Skip onboarding": { kind: "skipOnboarding" },
    "Recover workspace board": {
        kind: "recoverWorkspaceBoard",
        workspaceBoard,
    },
});
