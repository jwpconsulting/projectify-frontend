import type { SvelteComponentTyped } from "svelte";
import type {
    Label,
    NewSubTask,
    NewTask,
    SubTask,
    Task,
    Workspace,
    WorkspaceBoard,
    WorkspaceBoardSection,
    WorkspaceUser,
} from "$lib/types/workspace";
import type {
    WorkspaceBoardSectionModule,
    WorkspaceUserSearchModule,
    LabelSearchModule,
    MoveTaskModule,
} from "$lib/types/stores";

export interface Input {
    name?: string;
    label?: string;
    type?: string;
    value?: string;
    error?: string;
    placeholder?: string;
    readonly?: boolean;
    selectOptions?: { label: string; value: unknown }[];
    validation?: {
        required?: boolean;
        validator?: (
            value: unknown,
            data: unknown
        ) => {
            error?: boolean;
            message?: string;
        };
    };
}

export type LabelSelectionInput =
    | { kind: "noLabel" }
    | { kind: "allLabels" }
    | { kind: "label"; labelUuid: string };

export type LabelSelection =
    | { kind: "noLabel" }
    | { kind: "allLabels" }
    | { kind: "labels"; labelUuids: Set<string> };

export type WorkspaceUserSelectionInput =
    | { kind: "workspaceUser"; workspaceUser: WorkspaceUser }
    | { kind: "allWorkspaceUsers" }
    | { kind: "unassigned" };
export type WorkspaceUserSelection =
    | { kind: "workspaceUsers"; workspaceUserUuids: Set<string> }
    | { kind: "allWorkspaceUsers" }
    | { kind: "unassigned" };
export interface TasksPerUser {
    unassigned: number;
    assigned: Map<string, number>;
}

export type DestructiveOverlayType =
    | { kind: "deleteLabel"; label: Label }
    | { kind: "deleteMember"; workspaceUser: WorkspaceUser }
    | { kind: "deleteSection"; workspaceBoardSection: WorkspaceBoardSection }
    | { kind: "deleteTask"; task: Task }
    | { kind: "deleteSelectedTasks"; tasks: Task[] }
    | { kind: "archiveBoard"; workspaceBoard: WorkspaceBoard }
    | { kind: "deleteBoard"; workspaceBoard: WorkspaceBoard };

export type Overlay<Target, Action> =
    | { kind: "hidden" }
    | {
          kind: "visible";
          target: Target;
          action: Action;
      };

// XXX need typeof here for some reason
export type OverlayComponent = typeof SvelteComponentTyped<{
    // TODO this has to be something, the generic version of
    // DestructiveOverlayType
    target: unknown;
}>;

export type OverlayAction =
    | { kind: "async"; action: () => Promise<void> }
    | { kind: "sync"; action: () => void };

// TODO we could define some kind of UBER overlay type that also has a
// reference to the container, ... some time in the future Justus 2023-04-04
export type DestructiveOverlayState = Overlay<
    DestructiveOverlayType,
    OverlayAction
>;

export type ContextMenuType =
    | { kind: "profile" }
    | { kind: "workspace" }
    | { kind: "sideNav"; workspace: Workspace }
    | { kind: "workspaceBoard"; workspaceBoard: WorkspaceBoard }
    | {
          kind: "workspaceBoardSection";
          workspaceBoardSection: WorkspaceBoardSection;
          workspaceBoardSectionModule: WorkspaceBoardSectionModule;
      }
    | {
          kind: "task";
          task: Task;
          moveTaskModule: MoveTaskModule | undefined;
          location: "dashboard";
      }
    | {
          kind: "task";
          task: Task;
          moveTaskModule: MoveTaskModule | undefined;
          location: "task";
      }
    | { kind: "help" }
    | { kind: "permissions" }
    | {
          kind: "updateMember";
          workspaceUserSearchModule: WorkspaceUserSearchModule;
      }
    | {
          kind: "updateLabel";
          labelSearchModule: LabelSearchModule;
      };
export type ContextMenuState =
    | { kind: "hidden" }
    | { kind: "visible"; target: ContextMenuType; anchor: HTMLElement };

export type ConstructiveOverlayType =
    | { kind: "updateWorkspaceBoard"; workspaceBoard: WorkspaceBoard }
    | { kind: "createWorkspaceBoard"; workspace: Workspace }
    | { kind: "inviteTeamMembers"; workspace: Workspace }
    | { kind: "inviteTeamMembersNoSeatsLeft"; workspace: Workspace }
    | { kind: "createWorkspaceBoardSection"; workspaceBoard: WorkspaceBoard }
    | { kind: "createWorkspace" }
    | { kind: "skipOnboarding" }
    | { kind: "recoverWorkspaceBoard"; workspaceBoard: WorkspaceBoard };
export type ConstructiveOverlayState = Overlay<
    ConstructiveOverlayType,
    OverlayAction
>;

export interface FeatureDescription {
    image: {
        position: "left" | "right";
        src: string;
        alt: string;
    };
    header: string;
    text: string;
}

export interface SolutionsHeroContent {
    header: string;
    text: string;
    image: {
        src: string;
        alt: string;
    };
}

export interface SolutionsPageContent {
    heroContent: SolutionsHeroContent;
    features: FeatureDescription[];
}

// These types exist to cleanly separate between creating a new something
// or updating an existing something
// TODO we should cleanly abstract this with a generic type:
type CreateOrUpdateT<CreateType, UpdateType> =
    | { kind: "create"; create: CreateType }
    | { kind: "update"; update: UpdateType };

// TODO TaskOrNewTask = CreateOrUpdateT<NewTask, Task>
export type TaskOrNewTask =
    | { kind: "task"; task: Task }
    | { kind: "newTask"; newTask: NewTask };

export type CreateOrUpdateSubTask = CreateOrUpdateT<NewSubTask, SubTask>;

// A task with all the properties and sub-properties made required
// in order to properly render the breadcrumb
export type BreadCrumbWorkspaceBoardSection = WorkspaceBoardSection & {
    title: string;
    workspace_board: WorkspaceBoard & {
        title: string;
    };
};

export interface BreadCrumbTask {
    number?: number;
    workspace_board_section: BreadCrumbWorkspaceBoardSection;
}

// Woops, we can't use if-branch-based type narrowing here
export function isBreadCrumbWorkspaceBoardSection(
    t: WorkspaceBoardSection
): t is BreadCrumbWorkspaceBoardSection {
    return t.workspace_board !== undefined;
}
export function isBreadCrumbTask(t: Partial<Task>): t is BreadCrumbTask {
    return (
        t.number !== undefined &&
        t.workspace_board_section !== undefined &&
        t.workspace_board_section.workspace_board !== undefined
    );
}
