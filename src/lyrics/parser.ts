
export function getRandomLyricExcept(
  lyrics: string,
  linesCount: number = 5
): string[] {
  const lines = lyrics.split('\n').filter(line => line.trim() !== '');
  const randomLines: string[] = [];

  while (randomLines.length < linesCount && lines.length > 0) {
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomLine = lines[randomIndex];
    randomLines.push(randomLine);
    lines.splice(randomIndex, 1);
  }

  return randomLines;
}

export function parseLyrics(lyrics: string): string[] {
  const lines = lyrics.split('\n').filter(line => line.trim() !== '');
  const parsedLyrics: string[] = [];

  for (const line of lines) {
    const cleanedLine = line.trim().replace(/\s+/g, ' ');
    parsedLyrics.push(cleanedLine);
  }

  return parsedLyrics;
}

export function convertExcerptToInitials(lyricsExcerpt: string[]): string[] {
  return lyricsExcerpt.map(line =>
    line
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
  );
}