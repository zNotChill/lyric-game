
export type Config = {
  lyrics_url: string;
  lyrics_format: string;
  port: number;
  supported_songs: {
    artist: string;
    title: string;
  }[];
}