<script lang="ts">
	import { blur } from 'svelte/transition';
	import type { PageProps } from './$types';
	import Popup from '$lib/Popup.svelte';

	const { data }: PageProps = $props();
	const isMac = data.isMac;

	let cmdDown = $state(false);
	let kDown = $state(false);
	let activated = $state(false);

	function isSpecialKey(event: KeyboardEvent): boolean {
		if (event.metaKey && isMac) {
			return true;
		}
		if (event.ctrlKey && !isMac) {
			return true;
		}
		return false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (isSpecialKey(event) && event.key === 'k') {
			event.preventDefault();
		}
		if (isSpecialKey(event)) {
			cmdDown = true;
		}
		if (event.key === 'k') {
			kDown = true;
		}
	}

	function handleKeyUp(event: KeyboardEvent) {
		if (!isSpecialKey(event) && event.key === 'k') {
			event.preventDefault();
		}
		if (!isSpecialKey(event)) {
			cmdDown = false;
		}
		if (event.key === 'k') {
			kDown = false;
		}
	}

	$effect(() => {
		if (cmdDown && kDown) {
			activated = true;
		}
	});
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="flex h-screen items-center justify-center bg-rc-dark-1 text-neutral-200">
	{#if !activated}
		<div class="flex items-center text-2xl" transition:blur={{ duration: 300 }}>
			<div
				class={`relative h-32 w-40 rounded-xl border-2 ${cmdDown || activated ? 'rc-glow border-rc-primary text-rc-primary' : 'gray-glow border-neutral-300'}`}
			>
				<p class="absolute bottom-4 left-4 text-left">{isMac ? 'command' : 'control'}</p>
				<p class="absolute top-4 right-4 text-3xl">{isMac ? '⌘' : '⌃'}</p>
			</div>
			<p
				class={`px-6 text-3xl ${(cmdDown && kDown) || activated ? 'text-rc-primary' : 'text-neutral-400'}`}
			>
				+
			</p>
			<div
				class={`flex size-32 items-center justify-center rounded-xl border-2 ${kDown || activated ? 'rc-glow border-rc-primary text-rc-primary' : 'gray-glow border-neutral-300'}`}
			>
				<p class="text-4xl">K</p>
			</div>
		</div>
	{:else}
		<div
			class="pointer-events-none absolute inset-0 overflow-hidden bg-rc-primary/5"
			transition:blur={{ duration: 600 }}
		>
			<div class="relative h-full w-full blur-[128px]">
				<div class="orb-2-translate absolute top-1/2 left-1/2 -translate-1/2">
					<div class="orb-2-scale size-[min(50vh,50vw)] rounded-full bg-orange-400/30"></div>
				</div>
				<div class="orb-1-translate absolute top-1/2 left-1/2 -translate-1/2">
					<div class="orb-1-scale size-[min(60vh,60vw)] rounded-full bg-rc-primary/30"></div>
				</div>
				<div class="orb-3-translate absolute top-1/2 left-1/2 -translate-1/2">
					<div class="orb-3-scale size-[min(40vh,40vw)] rounded-full bg-red-500/30"></div>
				</div>
			</div>
		</div>
		<div
			transition:blur={{ delay: 100, duration: 500 }}
			class="absolute inset-0 z-10 flex h-full w-full items-center justify-center"
		>
			<Popup {isMac} mainPage={true} />
			<p class="absolute bottom-4 text-xs text-white/20">
				cmd + k is not affiliated or endorced by Raycast
			</p>
		</div>
	{/if}
</div>

<style>
	.rc-glow {
		--tw-shadow: 0 0 10px color-mix(in oklab, var(--color-rc-primary) 70%, transparent);
		--tw-shadow-color: color-mix(in oklab, var(--color-rc-primary) 70%, transparent);
		box-shadow:
			inset var(--tw-shadow),
			var(--tw-shadow);
		text-shadow: var(--tw-shadow);
	}

	.gray-glow {
		--tw-shadow: 0 0 5px color-mix(in oklab, var(--color-gray-300) 50%, transparent);
		--tw-shadow-color: color-mix(in oklab, var(--color-gray-300) 50%, transparent);
		box-shadow:
			inset var(--tw-shadow),
			var(--tw-shadow);
		text-shadow: var(--tw-shadow);
	}

	.orb-1-translate {
		animation: orb-1-translate 30s linear infinite;
	}

	.orb-1-scale {
		animation: orb-1-scale 50s linear infinite;
	}

	@keyframes orb-1-translate {
		0% {
			transform: translateX(-50%) translateY(-40%);
		}
		25% {
			transform: translateX(30%) translateY(-46%);
		}
		50% {
			transform: translateX(36%) translateY(40%);
		}
		75% {
			transform: translateX(-40%) translateY(60%);
		}
		100% {
			transform: translateX(-50%) translateY(-40%);
		}
	}

	@keyframes orb-1-scale {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(1.2);
		}
		50% {
			transform: scale(1);
		}
		75% {
			transform: scale(0.8);
		}
		100% {
			transform: scale(1);
		}
	}

	.orb-2-scale {
		animation: orb-2-scale 50s linear infinite;
	}
	.orb-2-translate {
		animation: orb-2-translate 70s linear infinite;
	}

	@keyframes orb-2-scale {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(1.2);
		}
		50% {
			transform: scale(1.1);
		}
		75% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes orb-2-translate {
		0% {
			transform: translateX(130%) translateY(130%);
		}
		25% {
			transform: translateX(66%) translateY(33%);
		}
		50% {
			transform: translateX(-130%) translateY(-130%);
		}
		75% {
			transform: translateX(-33%) translateY(66%);
		}
		100% {
			transform: translateX(130%) translateY(130%);
		}
	}

	.orb-3-scale {
		animation: orb-3-scale 40s linear infinite;
	}
	.orb-3-translate {
		animation: orb-3-translate 60s linear infinite;
	}

	@keyframes orb-3-scale {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(1.2);
		}
		50% {
			transform: scale(1.1);
		}
		75% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes orb-3-translate {
		0% {
			transform: translateX(-130%) translateY(-130%);
		}
		25% {
			transform: translateX(-80%) translateY(40%);
		}
		50% {
			transform: translateX(130%) translateY(130%);
		}
		75% {
			transform: translateX(60%) translateY(-70%);
		}
		100% {
			transform: translateX(-130%) translateY(-130%);
		}
	}
</style>
