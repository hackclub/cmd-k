<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();
	const isMac = data.isMac;
</script>

<div class="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
	<Popup {isMac} />
</div>

{@render children()}
