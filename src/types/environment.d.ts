namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
    AUTH0_DOMAIN: string;
    SECRET: string;
    PUSHER_APP_ID: string;
    PUSHER_KEY: string;
    PUSHER_SECRET: string;
    PUSHER_CLUSTER: string;
    NEXT_PUBLIC_PUSHER_APP_KEY: string;
  }
}
