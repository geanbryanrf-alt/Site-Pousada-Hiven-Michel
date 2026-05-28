import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        acomodacoes: resolve(__dirname, 'acomodacoes.html'),
        comodidades: resolve(__dirname, 'comodidades.html'),
        eventos: resolve(__dirname, 'eventos-riocentro.html'),
        experiencias: resolve(__dirname, 'experiencias.html'),
        localizacao: resolve(__dirname, 'localizacao.html'),
        politicas: resolve(__dirname, 'politicas.html'),
        reservas: resolve(__dirname, 'reservas.html')
      }
    }
  }
});
