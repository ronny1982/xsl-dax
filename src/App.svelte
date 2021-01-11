<script lang="ts">
    import ArchiveBrowser from './ArchiveBrowser.svelte';
    import CodeViewer from './CodeViewer.svelte';
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }

    .archive {
        flex: 0;
        border-right: 1px solid #888;
        background-color: #eee;
        max-width: 30%;
    }

    .viewer {
        flex: 1;
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>

<main class="container">
    <div class="archive">
        <ArchiveBrowser></ArchiveBrowser>
    </div>
    <div class="viewer">
        <CodeViewer theme="vs-light"></CodeViewer>
    </div>
</main>