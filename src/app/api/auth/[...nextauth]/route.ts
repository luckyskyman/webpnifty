import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider

export const authOptions = {
  // Configure one or more authentication providers here
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // For testing purposes: hardcoded user
        if (credentials?.username === "user" && credentials?.password === "pass") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET, // IMPORTANT: Set this in your .env.local file
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
