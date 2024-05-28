import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bycrpt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, AuthOptions);
export default authHandler;

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bycrpt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
};
