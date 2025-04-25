import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, always create a new instance
  console.log("[prisma.ts] Initializing new Prisma Client for production...");
  prismaInstance = new PrismaClient().$extends(withAccelerate());
} else {
  // In development, use the global instance if it exists, otherwise create one
  if (!global.prisma) {
    console.log("[prisma.ts] Initializing new Prisma Client for development (global cache)...");
    global.prisma = new PrismaClient().$extends(withAccelerate());
  }
  console.log("[prisma.ts] Using existing global Prisma Client from development cache...");
  prismaInstance = global.prisma;
}

/**
 * Returns the singleton instance of PrismaClient with Accelerate.
 */
const getPrismaInstance = (): PrismaClient => {
  return prismaInstance;
};

export default getPrismaInstance; 