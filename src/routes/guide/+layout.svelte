<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();
	const isMac = data.isMac;

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	const deadline = new Date('2025-08-17T23:59:00-04:00'); // EDT
	let localDeadline = $derived.by(() => {
		return deadline.toLocaleString(undefined, {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timeZoneName: 'short'
		});
	});
</script>

<div class="pointer-events-none fixed inset-0 z-50 flex h-full w-full items-center justify-center">
	<Popup {isMac} />
</div>

<div
	class="fixed top-0 right-0 left-0 z-10 flex h-18 justify-center border-b border-neutral-700 px-2 text-neutral-300 backdrop-blur-3xl lg:px-8"
>
	<div class="flex h-full grow items-center">
		<!-- Hamburger menu button (mobile only) -->
		<button
			onclick={toggleMobileMenu}
			class="mr-4 flex h-10 w-10 items-center justify-center rounded-md hover:bg-neutral-800 lg:hidden"
			aria-label="Toggle menu"
		>
			<svg
				class="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</button>

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

<!-- Desktop Sidebar -->
<div class="fixed hidden h-full min-h-screen w-72 flex-col lg:flex">
	<div class="h-18"></div>
	<div class="flex h-full flex-col px-2 py-4 text-neutral-300">
		<a href="/" class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"> Back to the main page </a>
		<p class="mx-4 pt-4 text-xs font-medium text-neutral-500">Guides</p>
		<a href="/guide/about" class="w-full rounded-md px-4 py-2 hover:bg-neutral-800">
			Welcome to cmd + k
		</a>
		<a href="/guide/mac" class="w-full rounded-md px-4 py-2 hover:bg-neutral-800">macOS guide</a>
		<a href="/guide/windows" class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
			>Windows guide</a
		>
		<p class="mx-4 pt-4 text-xs font-medium text-neutral-500">Other resources</p>
		<a
			href="https://developers.raycast.com"
			target="_blank"
			class="w-full rounded-md px-4 py-2 hover:bg-neutral-800">Official documentation</a
		>
		<a
			href="https://submit.hackclub.com/cmdkreq"
			target="_blank"
			class="w-full rounded-md px-4 py-2 hover:bg-neutral-800">Request Windows invite</a
		>
		<a
			href="https://hackclub.slack.com/archives/C0981BXG124"
			target="_blank"
			class="w-full rounded-md px-4 py-2 hover:bg-neutral-800">Join #cmd+k on Slack</a
		>
		<a
			href="https://submit.hackclub.com/cmdk"
			target="_blank"
			class="mt-6 w-full rounded-md bg-rc-primary px-4 py-2 text-rc-dark-1">Submit your extension</a
		>
		<div class="grow"></div>
		<p class="pb-2 text-center text-sm font-medium">cmd + k ends on<br />{localDeadline}</p>
		<p class="text-center text-xs text-neutral-500">
			Tip: you can use {isMac ? 'cmd' : 'ctrl'} + k on any page
		</p>
	</div>
</div>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
	<div class="fixed inset-0 z-40 lg:hidden">
		<!-- Backdrop -->
		<button
			type="button"
			class="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
			onclick={closeMobileMenu}
			aria-label="Close menu"
		></button>

		<!-- Mobile Sidebar -->
		<div
			class="fixed top-0 left-0 h-full w-72 transform border-r border-neutral-700 bg-rc-dark-1 transition-transform duration-300 ease-in-out"
		>
			<div class="flex h-full flex-col px-2 py-4 text-neutral-300">
				<a
					href="/"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
					onclick={closeMobileMenu}
				>
					Back to the home page
				</a>
				<p class="mx-4 pt-4 text-xs font-medium text-neutral-500">Guides</p>
				<a
					href="/guide/about"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
					onclick={closeMobileMenu}
				>
					Welcome to cmd + k
				</a>
				<a
					href="/guide/mac"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
					onclick={closeMobileMenu}
				>
					macOS guide
				</a>
				<a
					href="/guide/windows"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
					onclick={closeMobileMenu}
				>
					Windows guide
				</a>
				<p class="mx-4 pt-4 text-xs font-medium text-neutral-500">Other resources</p>
				<a
					href="https://developers.raycast.com"
					target="_blank"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
				>
					Official documentation
				</a>
				<a
					href="https://submit.hackclub.com/cmdkreq"
					target="_blank"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
				>
					Request Windows invite
				</a>
				<a
					href="https://hackclub.slack.com/archives/C0981BXG124"
					target="_blank"
					class="w-full rounded-md px-4 py-2 hover:bg-neutral-800"
				>
					Join #cmd+k on Slack
				</a>
				<a
					href="https://submit.hackclub.com/cmdk"
					target="_blank"
					class="mt-6 w-full rounded-md bg-rc-primary px-4 py-2 text-rc-dark-1"
				>
					Submit your extension
				</a>
				<div class="grow"></div>
				<p class="text-center text-xs text-neutral-500">This site is best viewed on desktop</p>
			</div>
		</div>
	</div>
{/if}

<div class="h-18"></div>

<div class="flex">
	<div class="hidden w-full max-w-72 lg:block"></div>
	<div class="flex grow justify-center text-neutral-300">
		<div class="mx-4 max-w-3xl grow lg:mx-18" id="guide-content">
			{@render children()}
			<p class="w-full pt-12 pb-4 text-center text-xs text-neutral-500">
				Built with ♥︎ by <a href="https://hackclub.com" target="_blank" class="underline"
					>Hack Club</a
				>. cmd + k is not affiliated or endorsed by Raycast
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

	#guide-content :global(li > a) {
		@apply underline;
	}

	#guide-content :global(ul) {
		@apply mt-2 list-disc pl-6;
	}

	#guide-content :global(pre.shiki) {
		@apply my-2 rounded-md p-4;
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-wrap: break-word;
		overflow-x: auto;
	}

	#guide-content :global(p code) {
		@apply rounded-sm bg-rc-dark-2 px-2 text-neutral-300;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	#guide-content :global(img) {
		@apply mx-auto my-2 rounded-md;
	}
</style>
