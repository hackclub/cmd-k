<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import type { PageProps } from '../$types';

	const { data }: PageProps = $props();
	const isMac = data.isMac;
</script>

<div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
	<Popup {isMac} />
</div>
