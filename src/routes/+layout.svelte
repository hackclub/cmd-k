<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>cmd + k</title>
	<meta name="description" content="Build a Raycast extension, get Raycast Pro | Hack Club YSWS" />
</svelte:head>

{@render children()}
