import { getLyricsData } from "../lyrics/api.ts";

export const cache = new Map<string, string[]>();

export const cacheLyrics = (key: string, lyrics: string[]) => {
  if (cache.has(key)) {
    cache.delete(key);
  }
  cache.set(key, lyrics);
}

export const getCachedLyrics = (key: string): string[] | undefined => {
  return cache.get(key);
}

export const clearCache = () => {
  cache.clear();
}

export const getCacheSize = () => {
  return cache.size;
}

export const getCacheKeys = () => {
  return Array.from(cache.keys());
}

export const getCacheValues = () => {
  return Array.from(cache.values());
}

export const getCacheEntries = () => {
  return Array.from(cache.entries());
}

export const hasCacheKey = (key: string) => {
  return cache.has(key);
}

export const deleteCacheKey = (key: string) => {
  return cache.delete(key);
}

export const clearCacheKey = (key: string) => {
  if (cache.has(key)) {
    cache.delete(key);
  }
}

export const getCacheKey = (key: string) => {
  return cache.get(key);
}

export const cacheIfNotExists = async (artist: string, title: string) => {
  const key = `${artist}-${title}`;
  
  if (cache.has(key)) {
    return cache.get(key);
  } else {
    const lyrics = await getLyricsData(artist, title);

    if (!lyrics) {
      return null;
    }

    if (lyrics) {
      return lyrics;
    }
    return null;
  }
}