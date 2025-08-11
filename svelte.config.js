import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { 
		adapter: adapter({
			// Enable precompression for better performance
			precompress: true,
			// Enable polyfills for Node.js compatibility
			polyfill: true
		}) 
	},
	extensions: ['.svelte', '.svx']
};

export default config;
