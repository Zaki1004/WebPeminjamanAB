import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/features/login/services/auth-services";

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET, // ✅ WAJIB
    pages: {
    signIn: "/", // 🔒 ROOT ADALAH LOGIN
  },


  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        nra: { label: "NRA", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const data = await loginService({
          nra: credentials.nra,
          password: credentials.password,
        });

  //       if (data.role === "user") {
  //   throw new Error("WEB_ACCESS_DENIED");
  // }

        return {
          id: credentials.nra,
          role: data.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          mustChangePassword: data.mustChangePassword,
          mustFillEmail: data.mustFillEmail,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.mustChangePassword = user.mustChangePassword;
        token.mustFillEmail = user.mustFillEmail;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.mustChangePassword = token.mustChangePassword;
      session.user.mustFillEmail = token.mustFillEmail;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };