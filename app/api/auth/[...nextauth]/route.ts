import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For development, accept any credentials
        // TODO: Replace with actual authentication logic
        if (credentials?.email) {
          return {
            id: "1",
            email: credentials.email,
            name: credentials.email.split('@')[0]
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }