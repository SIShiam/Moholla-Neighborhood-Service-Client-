import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { db } from "./mongodb";

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

const baseURL = getBaseURL();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "http://localhost:3000",
    "https://moholla-client.vercel.app",
    baseURL,
  ],
  advanced: {
    trustedProxyHeaders: true,
  },
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: true },
  socialProviders: googleEnabled
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } }
    : {},
  // The jwt plugin signs tokens the Express server can verify with our public keys at /api/auth/jwks.
  plugins: [jwt()],
});