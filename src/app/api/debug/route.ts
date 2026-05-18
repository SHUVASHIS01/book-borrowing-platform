import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasMongoURI: !!process.env.MONGODB_URI,
    hasBetterAuthURL: !!process.env.BETTER_AUTH_URL,
    betterAuthURL: process.env.BETTER_AUTH_URL || "NOT SET",
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    googleClientIdLength: (process.env.GOOGLE_CLIENT_ID || "").length,
    nodeEnv: process.env.NODE_ENV,
  });
}
