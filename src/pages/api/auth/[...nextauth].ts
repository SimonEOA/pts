import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const refreshAccessToken = async (token: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: newToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS ", newToken);

    return {
      ...token,
      accessToken: newToken.access_token,
      accessTokenExpires: Date.now() + newToken.expires_in * 1000, //1h
      refreshToken: newToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccesTokenError",
    };
  }
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  /** 
  pages: {
    signIn: "/login",
  },
  */
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        console.log("INITIAL SIGN IN");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log("TOKEN IS STILL VALID");
        return token;
      }
      console.log("ACCESSTOKEN HAS EXPIRED");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};
export default NextAuth(authOptions);
