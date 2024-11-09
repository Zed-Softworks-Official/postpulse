import type {
    findTweetsThatQuoteATweet,
    TwitterResponse
} from 'twitter-api-sdk/dist/types'

import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { twitter_client } from '~/server/twitter'

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

            const tweet_id = input.tweet_url.split('/').pop()
            if (!tweet_id) {
                return null
            }

            let tweet: TwitterResponse<findTweetsThatQuoteATweet>
            try {
                tweet = await twitter_client.tweets.findTweetsThatQuoteATweet(
                    tweet_id,
                    {
                        exclude: ['retweets']
                    }
                )
            } catch (e) {
                console.error(JSON.stringify(e, null, 2))

                return null
            }

            return tweet
        })
})
