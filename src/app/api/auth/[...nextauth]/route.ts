import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers here
  // For example:
  // providers: [
  //   CredentialsProvider({
  //     name: "Credentials",
  //     credentials: {
  //       username: { label: "Username", type: "text", placeholder: "jsmith" },
  //       password: { label: "Password", type: "password" }
  //     },
  //     async authorize(credentials, req) {
  //       // Add your own logic here to validate credentials
  //       return null;
  //     }
  //   })
  // ],
  // secret: process.env.NEXTAUTH_SECRET, // IMPORTANT: Set this in your .env.local file
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
