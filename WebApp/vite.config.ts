import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 8081,
		strictPort: true,
		fs: {
			allow: ['.']
		  }
	}
};

export default config;
