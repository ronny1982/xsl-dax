<script lang="ts">
    import hljs from 'highlight.js';
    import { SelectedArchiveEntry } from './stores';
    import { AvailableMimeTypes } from './mimes';

    let code: HTMLElement;
    let content = '';

    const unsubscribe = SelectedArchiveEntry.subscribe(update);
    async function update(file: File | null) {
        content = '';
        if(code) {
            code.style.backgroundImage = '';
        }
        if(!file) {
            return;
        }
        switch(file.type) {
            case AvailableMimeTypes.json:
                let json = JSON.parse(await file.text());
                if(json.Content && json.Content.Data) {
                    json.Content.Data = '…';
                    content = JSON.stringify(json, null, 2);
                    setTimeout(() => hljs.highlightBlock(code), 50);
                }
                break;
            case AvailableMimeTypes.png:
            case AvailableMimeTypes.bmp:
            code.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
                content = '';
            default:
                content = '';
        }
    }
</script>

<style>
    .code {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: white !important;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css">
</svelte:head>

<pre class="code json" bind:this={code}>
    {@html content}
</pre>