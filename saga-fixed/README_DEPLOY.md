# Deploy (any web hosting)

This project is a Vite + React SPA.

## 1) Build the production bundle
From:
- `c:/Users/Acer/Downloads/saga-luxury-stays-FIXED/saga-fixed`

Run:
```bat
npm run build
```
Output folder:
- `dist/`

## 2) Upload `dist/` to hosting
Most static hosts only need you to upload the `dist/` folder.

### Important: SPA routing
If you have routes like `/rooms`, `/booking`, etc., your host must serve `dist/index.html` for unknown paths.

#### If your host supports _rewrite rules_:
- Rewrite `/*` → `/index.html` with status 200.

#### If your host supports _fallback_:
- Set _SPA fallback_ / _index fallback_ to `index.html`.

## Netlify
A ready config file is already included:
- `netlify.toml`

Deploy method:
- Import from Git
- Build command: `npm run build`
- Publish directory: `dist`

## Local test (static)
You can serve the `dist/` folder locally after building using any static server.


