
// make a deno oak server with typescript
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "../core/config.ts";
import { cacheIfNotExists } from "../cache/cache.ts";
import { Success } from "../utils/logger.ts";
import { convertExcerptToInitials, getRandomLyricExcept } from "../lyrics/parser.ts";

const app = new Application();
const router = new Router();
const PORT = config.port || 8000;

router.get("/api/v1/lyrics/random", async (context) => {
  const possibleSongs = config.supported_songs;
  const randomSong = possibleSongs[Math.floor(Math.random() * possibleSongs.length)];
  const artist = randomSong.artist;
  const title = randomSong.title;
  
  const cached = await cacheIfNotExists(artist, title);

  if (cached) {
    const excerpt = getRandomLyricExcept(cached.join("\n"))
    context.response.body = {
      lyrics: convertExcerptToInitials(excerpt),
      a: excerpt
    };
  } else {
    context.response.status = 404;
    context.response.body = { error: "Lyrics not found" };
  }
});

app.use(router.routes());
app.listen({ port: PORT });
Success(`Server running on http://localhost:${PORT}`);