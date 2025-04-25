import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // Use 'any' for the global declaration to avoid complex extended type issues
  // eslint-disable-next-line no-var
  var prisma: any | undefined
}

// Type for the singleton instance, derived from the function's return type
type PrismaClientExtended = ReturnType<typeof createPrismaInstance>; 

// Module-level variable to hold the singleton instance ONCE created.
let prisma: PrismaClientExtended | undefined;

/**
 * Creates the actual Prisma Client instance.
 * Separated to easily get the return type.
 */
const createPrismaInstance = () => {
  console.log("[prisma.ts] Creating new Prisma Client instance with Accelerate.");
  return new PrismaClient().$extends(withAccelerate());
}

/**
 * Returns the singleton instance of PrismaClient with Accelerate.
 * Instantiates the client ONLY when first called.
 */
const getPrismaInstance = (): PrismaClientExtended => {
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
  const newInstance = createPrismaInstance();
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