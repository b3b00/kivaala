<script lang="ts">
	let name:string = 'world';

	import {onMount} from 'svelte';
    import Component2 from './components/Component2.svelte'
	import Component1 from './components/Component1.svelte'
	

	onMount(async () => {
		
	});

	let show1 : boolean = false;

	let show2 : boolean = false;


</script>
<div>hello</div>
<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" on:click={(e) => {e.preventDefault(); show1 = true; show2 = false;}}>1</a>
<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" on:click={(e) => {e.preventDefault(); show2 = true; show1 = false;}}>2</a>
<div style="{show1 ? 'display:block' : 'display:none'}">
	<Component1/>
</div>
<div style="{show2 ? 'display:block' : 'display:none'}">
	<Component2/>
</div>
