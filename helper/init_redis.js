const redis = require('redis')
const client = redis.createClient({
    legacyMode: true,
    PORT: 5001,
    host: "127.0.0.1"
});
client.connect().catch(console.error)

client.on('connect', () => {
    console.log('Client Connected to redis...')
})

client.on('ready', () => {
    console.log('Client Connected to redis and ready to use...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client Disconnected from redis...')
})

process.on('SIGINT', () => {
    client.quit();
})

module.exports = client;