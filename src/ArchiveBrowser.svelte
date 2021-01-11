<script lang="ts">
    import ArchiveChooser from './ArchiveChooser.svelte';
    import ArchiveEntryChooser from './ArchiveEntryChooser.svelte';
    import FileContentViewer from './FileContentViewer.svelte';

    let archive: File | null = null;
</script>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .archive {
        flex: 0;
    }
    .entries {
        flex: 0;
        max-height: 30%;
    }
    .content {
        flex: 2;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    .category {
        flex: 0;
        background-color: rgba(0, 0, 0, 0.25);
        color: #eee;
        font-weight: bold;
        font-size: larger;
        text-align: center;
        text-transform: uppercase;
        user-select: none;
    }
</style>

<main class="container">
    <div class="archive">
        <ArchiveChooser bind:archive={archive}></ArchiveChooser>
    </div>
    <div class="category">Entries</div>
    <div class="entries">
        <ArchiveEntryChooser bind:archive={archive}></ArchiveEntryChooser>
    </div>
    <div class="category">Info</div>
    <div class="content">
        <FileContentViewer></FileContentViewer>
    </div>
</main>