import { config } from "../core/config.ts";
import { parseLyrics } from "./parser.ts";

export function getApiURL(artist: string, title: string): string {
  const baseURL = config.lyrics_url
  const formattedArtist = encodeURIComponent(artist);
  const formattedTitle = encodeURIComponent(title);
  return `${baseURL}${config.lyrics_format.replace("{artist}", formattedArtist).replace("{title}", formattedTitle)}`;
}

export async function getLyricsData(artist: string, title: string): Promise<string[]> {
  const url = getApiURL(artist, title);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching lyrics: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.lyrics) {
    return parseLyrics(data.lyrics);
  } else if (data.error) {
    throw new Error(`Error from API: ${data.error}`);
  } else {
    throw new Error("Lyrics not found in response");
  }
}