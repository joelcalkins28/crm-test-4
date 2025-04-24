import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma: PrismaClient

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate())
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends(withAccelerate())
  }
  prisma = global.prisma
}

/**
 * Singleton instance of PrismaClient with Accelerate.
 */
export default prisma 