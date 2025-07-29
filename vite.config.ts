import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { inlineSvg } from '@svelte-put/inline-svg/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		inlineSvg(
			[
				{
					directories: 'static'
				}
			],
			{ typedef: true }
		),
		tailwindcss(),
		sveltekit()
	]
});
