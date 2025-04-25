import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// We don't need the global declaration here anymore as we simplify the logic
// declare global {
//   var prisma: PrismaClient | undefined
// }

let prismaInstance: PrismaClient | undefined;

/**
 * Returns a singleton instance of PrismaClient with Accelerate.
 * Initializes the client only if it doesn't exist in the module scope.
 * Simplified logic to avoid NODE_ENV checks during build.
 */
const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) {
    // Always create a new instance if one doesn't exist in this module's scope
    // The singleton nature is preserved by the module cache itself.
    console.log('Initializing new Prisma Client instance...'); // Add logging
    prismaInstance = new PrismaClient().$extends(withAccelerate());
  }
  return prismaInstance;
};

export default getPrismaInstance; 