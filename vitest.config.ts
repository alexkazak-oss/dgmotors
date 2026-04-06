/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import {defineConfig} from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'node',
		setupFiles: ['./src/__tests__/setup.ts'],
		include: ['src/**/*.test.{ts,tsx}'],
		globals: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '.'),
			'@payload-config': path.resolve(__dirname, './payload.config.ts'),
		},
	},
})
