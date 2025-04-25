console.log("[NextAuth Route] Top of file");

import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google" // Commented out for now
import getPrismaInstance from "@/lib/prisma" // Re-enabled singleton import

// console.log("[NextAuth Route] Importing PrismaClient...");
// import { PrismaClient } from "@prisma/client" // No longer needed here
// console.log("[NextAuth Route] PrismaClient imported.");

// console.log("[NextAuth Route] Importing withAccelerate...");
// import { withAccelerate } from '@prisma/extension-accelerate' // No longer needed here
// console.log("[NextAuth Route] withAccelerate imported.");

import type { NextAuthOptions } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { Session } from "next-auth";

console.log("[NextAuth Route] Checking environment variables...");

/* // Commented out Google env var check for now
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}
*/

if (!process.env.NEXTAUTH_SECRET) {
  console.error("[NextAuth Route] ERROR: Missing NEXTAUTH_SECRET environment variable!");
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}

console.log("[NextAuth Route] Environment variables checked.");

// Use the singleton function to get the Prisma client instance
console.log("[NextAuth Route] Calling getPrismaInstance() for adapter...");
const prisma = getPrismaInstance();
console.log("[NextAuth Route] getPrismaInstance() returned for adapter.");

/* // Removed direct instantiation
console.log("[NextAuth Route] Instantiating Prisma Client directly for adapter...");
let prismaForAdapter;
try {
  // ... direct instantiation code ...
} catch (error) {
  console.error("[NextAuth Route] ERROR during Prisma Client instantiation:", error);
  throw error; 
}
*/

console.log("[NextAuth Route] Configuring NextAuth options...");
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Re-enabled adapter with singleton instance
  providers: [
    /* // Commented out Google provider for now
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    */
  ],
  // session: { strategy: "jwt" }, // Use default database strategy with adapter
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }: { session: Session; user: AdapterUser }) { // Use user with adapter strategy
      console.log("[NextAuth Route] Session callback invoked (Adapter).");
      if (session.user) {
        session.user.id = user.id; 
      }
      return session;
    },
  },
};
console.log("[NextAuth Route] NextAuth options configured.");

console.log("[NextAuth Route] Calling NextAuth(authOptions)...");
const handler = NextAuth(authOptions);
console.log("[NextAuth Route] NextAuth(authOptions) returned.");

export { handler as GET, handler as POST };
console.log("[NextAuth Route] Exporting handlers."); 