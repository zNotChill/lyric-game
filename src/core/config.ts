import { Config } from "../types/Config.ts";

export const config: Config = {
  lyrics_url: "https://api.lyrics.ovh/v1",
  lyrics_format: "/{artist}/{title}",
  port: 8000,
  supported_songs: [
    {
      artist: "The Beatles",
      title: "Hey Jude",
    }
  ]
}