import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ✅ List of allowed emails (from .env)
const allowedUsers = process.env.ALLOWED_USERS?.split(",") || [];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // 🔒 Only allow users with whitelisted emails
      if (allowedUsers.includes(user.email)) {
        return true;
      }
      console.warn(`Unauthorized login attempt by: ${user.email}`);
      return false; // deny sign-in
    },
    async session({ session, token }) {
      // Optional: Add email to session for later use
      // ✅ Add isAdmin based on email
      const adminEmails = process.env.ALLOWED_ADMINS?.split(",") || [];
      session.user.isAdmin = adminEmails.includes(session.user.email);
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Optional: custom sign-in page
    error: "/unauthorized", // Optional: show an error page
  },
  secret: process.env.NEXTAUTH_SECRET, // Required
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
