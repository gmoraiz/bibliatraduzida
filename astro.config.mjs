import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

function copyEdicoesIntegration() {
  return {
    name: 'copy-edicoes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const { cpSync, existsSync } = await import('fs');
        const { fileURLToPath } = await import('url');
        const { join } = await import('path');
        const src = 'edicoes';
        const dest = join(fileURLToPath(dir), 'edicoes');
        if (existsSync(src)) {
          cpSync(src, dest, { recursive: true });
          console.log('✓ edicoes/ → dist/edicoes/');
        }
      }
    }
  };
}

function serveEdicoesPlugin() {
  return {
    name: 'serve-edicoes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/edicoes/')) return next();
        const { statSync, createReadStream } = await import('fs');
        const { join, extname } = await import('path');
        const urlPath = req.url.split('?')[0];
        const filePath = join(process.cwd(), urlPath.slice(1));
        try {
          if (statSync(filePath).isFile()) {
            const ext = extname(filePath);
            const ct = ext === '.json' ? 'application/json' : ext === '.pdf' ? 'application/pdf' : 'application/octet-stream';
            res.setHeader('Content-Type', ct);
            createReadStream(filePath).pipe(res);
            return;
          }
        } catch (_) {}
        next();
      });
    }
  };
}

export default defineConfig({
  site: 'https://bibliatraduzida.com',
  integrations: [sitemap(), copyEdicoesIntegration()],
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    plugins: [serveEdicoesPlugin()],
    server: {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    optimizeDeps: {
      force: true,
    },
  }
});
