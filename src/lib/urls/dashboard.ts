/*
 * Dashboard urls
 */
import type { WorkspaceBoard } from "$lib/types/workspace";

export const dashboardUrl = "/dashboard";

export function getWorkspaceBoardSearchUrl({
    uuid,
}: Pick<WorkspaceBoard, "uuid">): string {
    return `/dashboard/workspace-board/${uuid}/search`;
}
