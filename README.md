# Movie Review (Vite + React)

Search a movie to see its title, poster and IMDb rating using the OMDb API.

## Run
```bash
cp .env.example .env     # then add your OMDb key
npm install
npm run dev              # http://localhost:5173
```

## Build
```bash
npm run build            # output in dist/
npm run preview
```

Note: `VITE_` variables are bundled into the browser code, so the OMDb key is visible to anyone using the app. That's fine for a free key on a demo project.
