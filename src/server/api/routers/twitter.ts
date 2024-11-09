import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

const twitterSchema = z.object({
    tweet_url: z.string(),
    winner_count: z.number().min(1),
    must_follow: z.array(z.string())
})

export const twitterRouter = createTRPCRouter({
    generate: publicProcedure
        .input(twitterSchema)
        .mutation(async ({ input }) => {
            if (!input) {
                return null
            }

            return input
        })
})
