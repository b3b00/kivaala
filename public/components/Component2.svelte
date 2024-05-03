<script lang="ts">
    import {onMount} from 'svelte'

    let x : number;

    let y : number;

    let sum : number;

    $: {
        fetch(`/sum/${x}/${y}`)
        .then(response =>  response.json())
        .then(data => sum = data);
    }

</script>
<div>
<div>This is component 2</div>
<p>it's a real boring component</p>

</div>