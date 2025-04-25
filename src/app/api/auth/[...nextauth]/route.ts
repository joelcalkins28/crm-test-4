console.log("[NextAuth Route] Top of file");

import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google" // Commented out for now
// import getPrismaInstance from "@/lib/prisma" // No longer using the singleton function directly here for build

console.log("[NextAuth Route] Importing PrismaClient...");
import { PrismaClient } from "@prisma/client" // Import PrismaClient directly
console.log("[NextAuth Route] PrismaClient imported.");

console.log("[NextAuth Route] Importing withAccelerate...");
import { withAccelerate } from '@prisma/extension-accelerate' // Import Accelerate
console.log("[NextAuth Route] withAccelerate imported.");

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

// Instantiate Prisma Client directly within this file for the adapter
// This might help with build-time resolution issues.
// The singleton pattern in lib/prisma.ts is still recommended for runtime use elsewhere.
console.log("[NextAuth Route] Instantiating Prisma Client directly for adapter...");
let prismaForAdapter;
try {
  console.log("[NextAuth Route] Calling new PrismaClient()...");
  prismaForAdapter = new PrismaClient({
    log: [
      { emit: 'stdout', level: 'query' },
      { emit: 'stdout', level: 'info' },
      { emit: 'stdout', level: 'warn' },
      { emit: 'stdout', level: 'error' },
    ],
  });
  console.log("[NextAuth Route] new PrismaClient() returned.");

  console.log("[NextAuth Route] Calling .extends(withAccelerate())...");
  prismaForAdapter = prismaForAdapter.$extends(withAccelerate());
  console.log("[NextAuth Route] .extends(withAccelerate()) returned.");

  console.log("[NextAuth Route] Prisma Client instantiated successfully for adapter.");
} catch (error) {
  console.error("[NextAuth Route] ERROR during Prisma Client instantiation:", error);
  throw error; // Re-throw the error to ensure the build fails clearly if instantiation fails
}

console.log("[NextAuth Route] Configuring NextAuth options...");
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaForAdapter), // Use the directly instantiated client
  providers: [
    /* // Commented out Google provider for now
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    */
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add other NextAuth options here if needed (e.g., callbacks, pages)
  callbacks: {
    // Include user.id on session
    session({ session, user }: { session: Session; user: AdapterUser }) {
      console.log("[NextAuth Route] Session callback invoked.");
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