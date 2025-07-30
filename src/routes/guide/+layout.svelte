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
	<div class="w-full max-w-72"></div>
	<div class="flex grow justify-center text-neutral-300">
		<div class="mx-18 max-w-3xl grow pt-4" id="guide-content">
			{@render children()}
			<p class="w-full pt-12 pb-4 text-center text-xs text-neutral-500">
				Built with ♥︎ by <a href="https://hackclub.com" target="_blank" class="underline"
					>Hack Club</a
				>. cmd + k is not affiliated or endorced by Raycast
			</p>
		</div>
	</div>
</div>
<div class="w-full text-center text-neutral-700"></div>

<style lang="postcss">
	@reference "../../app.css";

	#guide-content :global(.title) {
		@apply text-5xl font-medium;
	}

	#guide-content :global(.subtitle) {
		@apply mt-4 text-xl text-neutral-400;
	}

	#guide-content :global(h1) {
		@apply mt-12 text-4xl font-medium;
	}

	#guide-content :global(h2) {
		@apply mt-10 text-3xl font-medium;
	}

	#guide-content :global(h3) {
		@apply mt-6 text-2xl font-medium;
	}

	#guide-content :global(p) {
		@apply mt-2;
	}

	#guide-content :global(p > a) {
		@apply underline;
	}

	#guide-content :global(ul) {
		@apply mt-2 list-disc pl-6;
	}
</style>
