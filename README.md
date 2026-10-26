# CineMind AI — Frontend Starter

Responsive React + Vite frontend for a movie recommendation system portfolio project.

## Included
- Dark cinematic responsive UI
- Movie discovery grid, title search, genre filters, sorting
- Watchlist interactions (demo state)
- Movie details modal with explanation
- AI mood-search modal (demo interface)
- Responsive mobile navigation

## Run on Windows
Install Node.js 18+ from https://nodejs.org, extract the ZIP, open this folder in VS Code terminal, then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

For production build:
```bash
npm run build
npm run preview
```

## Backend integration
The AI search, authentication and persistent watchlist are UI prototypes. Connect these endpoints to your backend:
- `GET /api/movies?query=&genre=&sort=`
- `GET /api/recommendations?user_id=`
- `POST /api/ratings`
- `POST /api/watchlist`
- `POST /api/ai-search` with `{ "query": "mind-bending sci-fi with a twist" }`

Movie artwork currently uses TMDB image CDN URLs for visual prototyping. Review the applicable image and attribution terms before public or commercial use. This project is not affiliated with TMDB.
