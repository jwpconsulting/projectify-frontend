<script lang="ts">
    import vars from "$lib/env";

    import type { PageData } from "./$types";

    import SettingsField from "$lib/components/dashboard/settings-field.svelte";
    import ProfilePictureFileSelector from "$lib/components/profilePictureFileSelector.svelte";
    import SettingFooterEditSaveButtons from "$lib/components/settingFooterEditSaveButtons.svelte";
    import { client } from "$lib/graphql/client";
    import { Mutation_UpdateWorkspace } from "$lib/graphql/operations";
    import { currentWorkspace } from "$lib/stores/dashboard";
    import type { Workspace } from "$lib/types/workspace";
    import { uploadImage } from "$lib/utils/file";

    export let data: PageData;

    let { workspace: workspaceInitial } = data;

    $: workspaceInitial = $currentWorkspace ?? workspaceInitial;

    let workspace: Workspace = workspaceInitial;

    $: {
        if (state != "editing" && workspaceInitial) {
            workspace = { ...workspaceInitial };
        }
    }

    let state: "viewing" | "editing" | "saving" = "viewing";

    async function saveData() {
        try {
            await client.mutate({
                mutation: Mutation_UpdateWorkspace,
                variables: {
                    input: {
                        uuid: workspaceInitial.uuid,
                        title: workspace.title,
                        description: workspace.description,
                    },
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    function fieldChanged() {
        state = "editing";
    }

    let imageFile: File | null = null;
    function onFileSelected({
        detail: { src, file },
    }: {
        detail: { src: string; file: File };
    }) {
        imageFile = file;
        state = "editing";
        if (!workspace) {
            throw new Error("Expected workspace");
        }
        workspace.picture = src;
    }

    async function save() {
        state = "saving";
        if (imageFile) {
            await uploadImage(
                imageFile,
                vars.API_ENDPOINT +
                    `/workspace/workspace/${workspaceInitial.uuid}/picture-upload`
            );
        }
        await saveData();
        state = "viewing";
    }

    async function cancel() {
        state = "saving";
        console.log("cancel");
        await new Promise(console.error);
    }
    async function onDelete() {
        console.log("delete");
        await new Promise(console.error);
    }
</script>

<div
    class:pointer-events-none={state === "saving"}
    class="flex flex-col space-y-4 divide-y divide-base-300"
>
    <SettingsField label="Icon image" labelVAlign="start">
        <ProfilePictureFileSelector
            url={workspace.picture}
            on:fileSelected={onFileSelected}
        >
            <div
                class="overflow-hidden rounded-md border border-base-300 bg-primary-content text-primary"
            >
                TODO: Show a ProfilePicture here?
            </div>
        </ProfilePictureFileSelector>
    </SettingsField>
    <SettingsField label="Project Name">
        <input
            type="text"
            id="title"
            name="title"
            autocomplete="email"
            placeholder={"Workspace title"}
            class="input input-bordered w-full"
            on:input={fieldChanged}
            bind:value={workspace.title}
        />
    </SettingsField>
    <SettingsField label="Description">
        <textarea
            rows="5"
            class="textarea textarea-bordered w-full"
            on:input={fieldChanged}>{workspace.description}</textarea
        >
    </SettingsField>
    <SettingsField label="Danger Zone">
        <button
            disabled={state === "saving"}
            class="btn btn-outline btn-accent btn-sm w-full rounded-full hover:bg-accent hover:text-accent-content"
            on:click={onDelete}
        >
            {"Delete Workspace"}
        </button>
    </SettingsField>
</div>

<SettingFooterEditSaveButtons {state} {save} {cancel} />