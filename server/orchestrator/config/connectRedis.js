import Redis from "ioredis";
const redis = new Redis({
  port: 12219, // Redis port
  host: "redis-12219.c16.us-east-1-3.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "yjgAYG7oZu8qFP3RSVuopDHuNVeejO3v",
  db: 0, // Defaults to 0
})

export default redis;