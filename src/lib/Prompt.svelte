<script lang="ts">
	let { isMac = true, activate = () => {} }: { isMac?: boolean; activate?: () => void } = $props();

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

	$effect(() => {
		if (activated) {
			activate();
		}
	});
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<svelte:head>
	<title>{isMac ? 'cmd + k' : 'ctrl + k'}</title>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-rc-dark-1 text-neutral-200">
	<div class="flex items-center text-2xl">
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
</style>
