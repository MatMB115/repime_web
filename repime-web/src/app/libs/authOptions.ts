import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prisma_db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('E-mail é obrigatório');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error('Usuário não encontrado');
        }

        // Se o usuário digitar uma senha, nós a verificamos.
        // Se não digitar, permitimos o login (útil para usuários importados).
        if (credentials.password) {
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.senha || ''
          );

          if (!isCorrectPassword) {
            throw new Error('Senha incorreta');
          }
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        (session.user as any).id = token.sub;
        
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { is_administrador: true }
        });
        
        (session.user as any).is_administrador = user?.is_administrador || false;
      }
      return session;
    },
  }
};
