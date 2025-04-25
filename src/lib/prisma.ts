import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | undefined;

/**
 * Returns a singleton instance of PrismaClient with Accelerate.
 * Initializes the client only if it doesn't exist.
 */
const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) {
    if (process.env.NODE_ENV === 'production') {
      prismaInstance = new PrismaClient().$extends(withAccelerate())
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient().$extends(withAccelerate())
      }
      prismaInstance = global.prisma
    }
  }
  return prismaInstance;
};

export default getPrismaInstance; 