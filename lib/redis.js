import upstash from '@upstash/redis'

const redis = upstash(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN)

export async function setUrl(url) {
    const short = getShort()
    await redis.set(`short/${short}`, url)

    return short
}

export async function getUrl(short) {
    const data = await redis.get(`short/${short}`)
    return data.data
}

function getShort() {
    const alpha = 'abcdefghijklmnopqrstuvwyz1234567890'.split("")

    return [...new Array(8)].map(_ => alpha[Math.floor(Math.random() * alpha.length)]).join("")
}