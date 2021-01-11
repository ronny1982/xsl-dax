<script lang="ts">
    import { onMount } from 'svelte';
    // monaco editor is currently imported in index.html via unpkg, due to rollup bundle errors ...
    //import * as monaco from 'monaco-editor';
    import { SelectedArchiveEntry } from './stores';
    import { AvailableMimeTypes } from './mimes';
    import { prettyXML } from './pretty';

    let viewer: any; // monaco.editor.IStandaloneCodeEditor;
    let hook: HTMLElement;

    export let theme: string;
    let language: string;

    const unsubscribe = SelectedArchiveEntry.subscribe(update);

    async function update(file: File | null) {
        if(!viewer) {
            return;
        }
        if(!file) {
            return viewer.setValue('');
        }
        switch(file.type) {
            case AvailableMimeTypes.json:
                let json = JSON.parse(await file.text());
                if(json.Content && json.Content.Data) {
                    monaco.editor.setModelLanguage(viewer.getModel(), 'xml');
                    viewer.setValue(prettyXML(json.Content.Data));
                } else {
                    monaco.editor.setModelLanguage(viewer.getModel(), 'json');
                    viewer.setValue(JSON.stringify(json, null, 2));
                }
                break;
            case AvailableMimeTypes.xml:
                monaco.editor.setModelLanguage(viewer.getModel(), 'xml');
                viewer.setValue(prettyXML(await file.text()));
                break;
            case AvailableMimeTypes.txt:
                monaco.editor.setModelLanguage(viewer.getModel(), '');
                viewer.setValue(await file.text());
                break;
            case AvailableMimeTypes.cpp:
                monaco.editor.setModelLanguage(viewer.getModel(), 'cpp');
                viewer.setValue(await file.text());
                break;
            case AvailableMimeTypes.png:
            case AvailableMimeTypes.bmp:
                monaco.editor.setModelLanguage(viewer.getModel(), '');
                viewer.setValue(await file.text());
                break;
            default:
                monaco.editor.setModelLanguage(viewer.getModel(), '');
                viewer.setValue(await file.text());
        }
    }

    onMount(() => {
        viewer = monaco.editor.create(hook, {
            theme: theme,
            language: language,
            automaticLayout: true,
            formatOnType: true,
            readOnly: true
        });
    });
</script>

<style>
    .viewer {
        display: block;
        flex: 1;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
    }
</style>

<main class="viewer" bind:this={hook}></main>