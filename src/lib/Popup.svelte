<script lang="ts">
	import { onMount } from 'svelte';
	import { getContent } from '$lib/popup_content';

	const { isMac, mainPage = false }: { isMac: boolean; mainPage?: boolean } = $props();
	let textInput = $state<HTMLInputElement | null>(null);

	const content = getContent(mainPage);

	let query = $state('');
	let curSelection = $state(0);
	let activeName = $state('');
	let shown = $state(false);

	let popupRef = $state<HTMLDivElement | null>(null);

	onMount(() => {
		setInterval(() => {
			if (textInput) {
				textInput.focus();
			}
		}, 1);

		function handleClickOutside(event: MouseEvent) {
			if (!mainPage && shown && popupRef && !popupRef.contains(event.target as Node)) {
				close();
			}
		}
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	});

	let allContent = $derived.by(() => {
		return content.flatMap((category) => category.content);
	});

	let filteredContent = $derived.by(() => {
		if (!query) return content;

		const lowerQuery = query.toLowerCase();
		const filteredAllContent = allContent.filter((item) =>
			item.name.toLowerCase().includes(lowerQuery)
		);
		console.log('Filtered Content:', filteredAllContent);
		if (filteredAllContent.length === 0) {
			return [];
		}
		return [
			{
				name: 'Results',
				content: filteredAllContent
			}
		];
	});

	let filteredContentFlat = $derived.by(() => {
		return filteredContent.flatMap((category) => category.content);
	});

	let curSelectionName = $derived.by(() => {
		return filteredContentFlat[curSelection]?.name || '';
	});
	let bbAction = $derived.by(() => {
		return filteredContentFlat[curSelection]?.action.text || '';
	});
	let bbActionKey = $derived.by(() => {
		return filteredContentFlat[curSelection]?.action.key || '';
	});

	let activeIcon = $derived.by(() => {
		return filteredContentFlat.find((item) => item.name === activeName)?.icon || '';
	});
	let activeText = $derived.by(() => {
		return filteredContentFlat.find((item) => item.name === activeName)?.name || '';
	});

	$effect(() => {
		if (filteredContentFlat.length === 0) {
			curSelection = 0;
			return;
		}
		if (curSelection < 0) {
			curSelection = 0;
		} else if (curSelection >= filteredContentFlat.length) {
			curSelection = filteredContentFlat.length - 1;
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			curSelection += 1;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			curSelection -= 1;
		} else if (event.key === 'Enter') {
			openItem(curSelectionName);
			return;
		} else {
			curSelection = 0;
		}
		const selectedItem = document.getElementById(`item-${curSelectionName}`);
		if (selectedItem) {
			selectedItem.scrollIntoView({
				block: 'nearest',
				inline: 'nearest'
			});
		}
	}

	function openItem(name: string) {
		const item = filteredContentFlat.find((item) => item.name === name);
		if (item && item.action) {
			if (item.action.type === 'link') {
				const a = document.createElement('a');
				a.href = item.action.value;
				a.target = '_blank';
				a.classList.add('hidden');
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
			if (item.action.type === 'page') {
				const a = document.createElement('a');
				a.href = item.action.value;
				a.classList.add('hidden');
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		}
	}

	function close() {
		if (mainPage) return;

		shown = false;
		query = '';
		curSelection = 0;
		activeName = '';
	}

	function isSpecialKey(event: KeyboardEvent): boolean {
		if (event.metaKey && isMac) {
			return true;
		}
		if (event.ctrlKey && !isMac) {
			return true;
		}
		return false;
	}

	function windowKeyDown(event: KeyboardEvent) {
		if (mainPage) return;

		if (isSpecialKey(event) && event.key === 'k') {
			event.preventDefault();
			shown = true;
		}
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keydown={windowKeyDown} />

<div
	bind:this={popupRef}
	class={`pointer-events-auto z-50 mx-8 h-94 w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-neutral-600 text-neutral-300 shadow-2xl shadow-black backdrop-blur-3xl ${mainPage || shown ? 'flex' : 'hidden'} ${mainPage ? 'bg-rc-dark-1/70' : 'bg-rc-dark-2/80'}`}
>
	<div class="flex border-b border-neutral-600/50 p-1.5 text-lg text-neutral-300">
		<input
			type="text"
			placeholder="Search and navigate using arrow keys & enter..."
			class="grow p-2 placeholder-white/30 outline-none"
			bind:this={textInput}
			bind:value={query}
			onkeydown={handleKeyDown}
		/>
	</div>
	<div class="no-scrollbar grow overflow-y-scroll pb-2 text-sm">
		{#each filteredContent as category (category.name)}
			<div class="px-2" id={`category-${category.name}`}>
				<p class="p-2 pt-2.5 pb-1.5 text-xs font-medium text-white/50">{category.name}</p>
			</div>
			<div class="px-2">
				{#each category.content as item (item.name)}
					<button type="button" class="w-full text-left" onclick={() => openItem(item.name)}>
						<div
							class={`flex h-10 scroll-my-2 items-center space-x-2 rounded-md px-2 ${curSelectionName === item.name ? 'bg-white/15' : 'hover:bg-white/5'}`}
							id={`item-${item.name}`}
						>
							<img src={item.icon} alt="" class="size-5 text-rc-primary" />
							<p class="grow">{item.name}</p>
							<p class="text-white/50">{item.type}</p>
						</div>
					</button>
				{/each}
			</div>
		{/each}
		{#if filteredContent.length === 0}
			<div class="flex h-full w-full items-center justify-center">
				<p class="text-md px-2 py-2.5 font-medium text-white/50">No results</p>
			</div>
		{/if}
	</div>
	<div class="flex h-full max-h-10 items-center bg-neutral-700/50 px-2 text-xs">
		<a href="https://raycast.com" target="_blank" aria-label="Raycast website">
			<svg inline-src="rc-dark" class="size-6 rounded-md p-0.25 text-white/30 hover:bg-white/10"
			></svg>
		</a>
		<div class="grow"></div>
		<div class="flex items-center space-x-2 px-1">
			<p class="">{bbAction}</p>
			{#if bbActionKey === 'enter'}
				<div class="rounded-md bg-white/10 p-0.5 px-1.5"><p class="translate-y-0.25">↵</p></div>
			{/if}
		</div>
	</div>
</div>
