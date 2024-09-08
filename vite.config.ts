import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();


console.log("**************************************\nHi from the vite.config.ts file.\n\n");

console.log("**************************************\n");

export default defineConfig({
	plugins: [sveltekit()]
});
