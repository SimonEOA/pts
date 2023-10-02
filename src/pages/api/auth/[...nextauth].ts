import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth, { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

const refreshAccessToken = async (token: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}) => {
  try {
    if (token?.accessToken && token?.refreshToken) {
      spotifyApi.setAccessToken(token?.accessToken);
      spotifyApi.setRefreshToken(token?.refreshToken);

      const { body: newToken } = await spotifyApi.refreshAccessToken();
      console.log("REFRESHED TOKEN IS ", newToken);

      return {
        ...token,
        accessToken: newToken.access_token,
        accessTokenExpires: Date.now() + newToken.expires_in * 1000, //1h
        refreshToken: newToken.refresh_token ?? token.refreshToken,
      };
    }
    return {
      ...token,
      error: "RefreshAccesTokenError",
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccesTokenError",
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  /** 
  pages: {
    signIn: "/login",
  },
  */
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User | AdapterUser | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (account && user) {
        console.log("INITIAL SIGN IN");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          maxAge: account?.expires_at ? account.expires_at * 1000 : 0,
        };
      }

      if (token?.maxAge && Date.now() < (token?.maxAge as number)) {
        console.log("TOKEN IS STILL VALID");
        return token;
      }
      console.log("ACCESSTOKEN HAS EXPIRED");
      return await refreshAccessToken({
        accessToken: account?.access_token,
        refreshToken: account?.refresh_token,
      });
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
