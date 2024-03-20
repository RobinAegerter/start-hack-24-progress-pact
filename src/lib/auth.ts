import { prisma } from "@/lib/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const config = {
  maxDuration: 300,
};
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        confirmPassword: { label: "Confirm Password", type: "password" },
      },
      async authorize(user: any, req: any) {
        if (!user.email) {
          return false;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        let userId = dbUser?.id;

        if (dbUser && dbUser.password) {
          // user already exists validate password
          const match = await bcrypt.compare(user.password, dbUser.password);
          if (!match) {
            throw new Error("Wrong password");
          }
        } else if (
          user.name &&
          user.email &&
          user.password &&
          user.confirmPassword
        ) {
          const passwordMatches = user.password === user.confirmPassword;

          if (!passwordMatches) {
            throw new Error("Passwords do not match");
          }

          const hash = await bcrypt.hash(user.password, 10);

          const userResponse = await prisma.user.upsert({
            where: { email: user.email! },
            update: {
              name: user.name!,
              email: user.email!,
            },
            create: {
              name: user.name!,
              email: user.email!,
              password: hash,
            },
          });
          userId = userResponse.id;
        } else {
          throw new Error("Something went wrong!");
        }

        // TODO if you need to add more properties to the token you can do it here
        user.dbId = userId;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        const userResponse = await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            name: user.name!,
            email: user.email!,
          },
          create: {
            name: user.name!,
            email: user.email!,
          },
        });

        // TODO if you need to add more properties to the token you can do it here
        user.dbId = userResponse.id;
      }

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // TODO if you need to add more properties to the token you can do it here
        token.dbId = user?.dbId;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      if (session?.user) {
        // TODO if you need to add more properties to the token you can do it here
        session.user.dbId = token.dbId;
      }
      return session;
    },
  },
};

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found");
  }

  if (!session.user) {
    throw new Error("No user found in session");
  }

  return session.user;
}
