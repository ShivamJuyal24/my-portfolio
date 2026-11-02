import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();
const KEY = "portfolio:views";

// Read the count without incrementing
export async function GET() {
  const views = (await redis.get<number>(KEY)) ?? 0;
  return NextResponse.json({ views });
}

// Count a new view
export async function POST() {
  const views = await redis.incr(KEY);
  return NextResponse.json({ views });
}