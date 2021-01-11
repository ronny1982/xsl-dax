<script lang="ts">
    import { onMount } from 'svelte';

    let dropzone: HTMLLabelElement;
    export let archive: File | null;

    function onArchiveChanged(event: Event): void {
        const element = event.target as HTMLInputElement;
        if(element && element.files && element.files.length > 0) {
            archive = element.files[0];
        }
    }

    function handleDrag(event: DragEvent, opacity: number) {
        event.preventDefault();
        dropzone.style.borderColor = `rgba(0, 0, 0, ${opacity})`;
    }

    onMount(() => {
        dropzone.addEventListener('dragenter', event => handleDrag(event, 0.75));
        dropzone.addEventListener('dragleave', event => handleDrag(event, 0.25));
        dropzone.addEventListener('dragover', event => handleDrag(event, 0.75));
        dropzone.addEventListener('drop', event => {
            handleDrag(event, 0.25);
            if(event.dataTransfer) {
                const file = [...event.dataTransfer.files].find(file => /\.ham/.test(file.name));
                if(file) {
                    archive = file;
                }
            }
        });
    });
</script>

<style>
    #dropzone {
        display: block;
        margin: 0.5em;
        padding: 0.5em;
        border: 0.25em dashed rgba(0, 0, 0, 0.25);
        cursor: pointer;
        user-select: none;
    }

    #dropzone * {
        pointer-events: none;
    }

    .description {
        opacity: 0.25;
        white-space: nowrap;
        font-weight: bold;
        text-align: center;
    }

    #chooser {
        display: none;
    }

    .file {
        white-space: nowrap;
        font-size: small;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<main>
    <input id="chooser" type="file" accept=".hamXslAssay, .hamSystem" on:change={onArchiveChanged} />
    <label for="chooser" id="dropzone" title="Open HAMILTON XRP2 XSL Document Archive" bind:this={dropzone}>
        <div class="description">XSL Archive</div>
        <div class="file">{archive ? archive.name : '…'}</div>
    </label>
</main>