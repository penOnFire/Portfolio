# Sean Fernandez Portfolio

React + TypeScript + Vite portfolio with two views:

- `/` and `/immersive` — 3D scroll-driven immersive experience
- `/minimal` — bento-style minimal layout with light/dark theme

## Development

```bash
npm install
npm run dev
```

## Contact form (Web3Forms)

The contact form on both views sends messages via [Web3Forms](https://web3forms.com).

1. Create a free account at [web3forms.com](https://web3forms.com).
2. Generate an access key tied to your inbox.
3. Copy `.env.example` to `.env.local` and set your key:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Restart the dev server after changing env vars.

If the key is missing, the form shows a configuration error instead of failing silently.

## Production (Docker)

Vite embeds `VITE_*` variables at **build time**. Pass the access key when building the image:

```bash
docker build --build-arg VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here -t seanshine-portfolio .
```

### Caching

- **Runtime (3D):** shared geometry cache, instanced star field, and split day/night context reduce GPU/CPU work during scroll.
- **Production assets:** nginx serves hashed `/assets/` files with `Cache-Control: public, immutable` (1 year). `index.html` is always revalidated so deploys propagate.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
