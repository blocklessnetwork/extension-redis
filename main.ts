import { connect, Redis } from "https://deno.land/x/redis@v0.29.0/mod.ts";
import { CGIExtension } from "https://deno.land/x/bls_runtime_extension@v0.0.2/mod.ts";

async function main() {
  let redis: Redis;

  const redisExtension = new CGIExtension({
    name: "bls-redis-extension",
    alias: "redis",
    description: "Redis extension for Blockless Runtime built with Deno",
  });

  redisExtension.export("get", async (key: string, config) => {
    if (!redis && !config) throw new Error("No config vailable.");
    if (!redis) redis = await connect(config);

    return await redis.get(key) as string;
  });

  redisExtension.export("set", async (key: string, value: string, config) => {
    if (!redis && !config) throw new Error("No config vailable.");
    if (!redis) redis = await connect(config);

    return await redis.set(key, value);
  });

  // Execute and listen to incoming readable stream
  await redisExtension.execute();
}

main();
