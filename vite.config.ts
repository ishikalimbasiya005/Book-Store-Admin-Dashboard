import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === 'EVAL') return;
        defaultHandler(warning);
      },
    },
    // @ts-ignore - Rolldown options for Vite 6+
    rolldownOptions: {
      onwarn(warning: any, defaultHandler: any) {
        if (warning.code === 'EVAL') return;
        defaultHandler(warning);
      },
    }
  }
})
