import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// The export ships src/ only. This is the smallest build that renders it the way the desk does:
// .svx pages through mdsvex, `layout: runbook` from src/lib/layouts, `#lib/…` imports.
export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })],
      adapter: adapter({ pages: 'build', assets: 'build' }),
      prerender: { entries: ['/kb'] },
    }),
  ],
});
