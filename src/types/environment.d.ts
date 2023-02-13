namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
    AUTH0_DOMAIN: string;
    SECRET: string;
  }
}
