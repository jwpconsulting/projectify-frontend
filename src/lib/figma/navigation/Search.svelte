<script lang="ts">
    import { _ } from "svelte-i18n";
    import InputField from "$lib/figma/input-fields/InputField.svelte";
</script>

<div
    class="flex flex-row justify-center border-b-2 border-border bg-foreground py-4 px-2"
>
    <div class="">
        <InputField
            style={{ kind: "search" }}
            placeholder={$_("dashboard.search-task")}
            name="search"
        />
    </div>
</div>
