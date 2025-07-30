<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();
	const isMac = data.isMac;
</script>

<div class="pointer-events-none fixed inset-0 flex h-full w-full items-center justify-center">
	<Popup {isMac} />
</div>

<div
	class="fixed top-0 right-0 left-0 flex h-18 justify-center border-b border-neutral-700 px-8 text-neutral-300 backdrop-blur-3xl"
>
	<div class="flex h-full max-w-7xl grow items-center">
		<a
			href="/"
			class="group flex items-center space-x-2 text-xl hover:scale-110 motion-safe:transition-transform"
		>
			<img src="/favicon.png" alt="cmd + k Icon" class="size-10" />
			<p
				class="gray-glow-text group-hover:rc-glow-text group-hover:text-rc-primary motion-safe:transition-colors"
			>
				cmd + k
			</p>
		</a>
		<div class="grow"></div>
		<div class="flex h-full items-center space-x-8">
			<a
				href="https://hackclub.com"
				target="_blank"
				class="hover:-translate-y-2 hover:scale-110 hover:-rotate-10 motion-safe:transition-transform"
			>
				<img src="/flag-orpheus-top.svg" alt="Hack Club Flag" class="h-18" /></a
			>
		</div>
	</div>
</div>

<div class="h-18"></div>

<div class="fixed flex min-h-screen w-72 flex-col"></div>

<div class="flex">
	<div class="w-72"></div>
	<div class="flex grow justify-center py-10 text-neutral-300">
		<div class="mx-18 max-w-6xl grow" id="guide-content">
			{@render children()}
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "../../app.css";

	#guide-content :global(.title) {
		@apply text-5xl font-medium;
	}

	#guide-content :global(.subtitle) {
		@apply mt-4 text-xl text-neutral-400;
	}

	#guide-content :global(h1) {
		@apply mt-4 text-4xl font-medium;
	}

	#guide-content :global(p) {
		@apply mt-4;
	}
</style>
