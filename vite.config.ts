import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss({
			content: {
				files: ['./src/**/*.{html,js,svelte,ts}'],
				transform: {
					svelte: (content) => {
						// Remove script sections before parsing for CSS classes
						return content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
					}
				}
			}
		}), 
		sveltekit()
	]
});
