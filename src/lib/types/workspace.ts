import type { TimestampedType, TitleDescriptionType } from "$lib/types/base";
import type { User } from "$lib/types/user";

export type WorkspaceUser = {
    user: User;
    uuid: string;
    job_title?: string;
    role: string;
} & TimestampedType;

export type Label = {
    name: string;
    color: number;
    uuid: string;
};

export type SubTask = {
    uuid: string;
    done: boolean;
    order: number;
} & TimestampedType &
    TitleDescriptionType;

export type ChatMessage = {
    author: WorkspaceUser;
    uuid: string;
    text: string;
} & TimestampedType;

export type Task = {
    _order: number;
    uuid: string;
    deadline?: string;
    number: number;
    labels: Label[];
    assignee?: WorkspaceUser;
    workspace_board_section?: WorkspaceBoardSection;
    sub_tasks?: SubTask[];
    chat_messages?: ChatMessage[];
} & TimestampedType &
    TitleDescriptionType;

export type WorkspaceBoardSection = {
    _order: number;
    uuid: string;
    tasks?: Task[];
    workspace_board?: WorkspaceBoard;
} & TimestampedType &
    TitleDescriptionType;

export type WorkspaceBoard = {
    deadline?: string;
    uuid: string;
    workspace_board_sections?: WorkspaceBoardSection[];
    archived?: string;
    workspace?: Workspace;
} & TimestampedType &
    TitleDescriptionType;

export type Workspace = {
    picture?: string;
    workspace_users?: WorkspaceUser[];
    workspace_boards?: WorkspaceBoard[];
    labels?: Label[];
    uuid: string;
} & TimestampedType &
    TitleDescriptionType;