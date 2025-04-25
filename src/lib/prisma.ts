import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Module-level variable to hold the singleton instance ONCE created.
// Crucially, it starts as undefined.
let prisma: PrismaClient | undefined;

/**
 * Returns the singleton instance of PrismaClient with Accelerate.
 * Instantiates the client ONLY when first called.
 */
const getPrismaInstance = (): PrismaClient => {
  if (process.env.NODE_ENV !== 'production') {
    if (global.prisma) {
      // console.log("[prisma.ts] Using existing global Prisma Client (Dev).");
      return global.prisma;
    }
  }

  // Production or Dev (first time): Check module-level cache
  if (prisma) {
    // console.log("[prisma.ts] Using existing module Prisma Client (Prod/Dev).");
    return prisma;
  }

  // === INSTANTIATION POINT ===
  // Only happens if no instance exists in cache (global or module)
  console.log("[prisma.ts] LAZY INITIALIZATION: Creating new Prisma Client instance NOW.");
  const newInstance = new PrismaClient().$extends(withAccelerate());
  // const newInstance = new PrismaClient(); // Base client used for debugging

  // Cache the new instance
  if (process.env.NODE_ENV !== 'production') {
    global.prisma = newInstance; // Cache globally in dev
    // console.log("[prisma.ts] Cached new instance globally (Dev).");
  }
  prisma = newInstance; // Cache locally in module scope (for prod and future dev calls)
  // console.log("[prisma.ts] Cached new instance in module scope.");

  return newInstance;
};

export default getPrismaInstance; 