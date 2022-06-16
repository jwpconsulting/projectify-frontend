<script lang="ts">
    export let userData;
</script>

{#if userData}
    <a href="/dashboard" class="btn btn-primary btn-md rounded-full"
        >Continue to Dashboard</a
    >
{:else}
    <a
        href="/signin"
        class="btn btn-ghost text-primary btn-primary btn-md rounded-full bg-base-100"
        >Log in</a
    >
    <a href="/signup" class="btn btn-primary rounded-full btn-md"
        >Start a free trial</a
    >
{/if}
