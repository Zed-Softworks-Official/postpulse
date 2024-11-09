import { Client } from 'twitter-api-sdk'
import { env } from '~/env'

const global_for_twitter = global as unknown as { twitter_client: Client }

export const twitter_client =
    global_for_twitter.twitter_client || new Client(env.TWITTER_BEARER_TOKEN)

if (env.NODE_ENV !== 'production') {
    global_for_twitter.twitter_client = twitter_client
}
