import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

// Reuse one client in dev so hot reloads do not open new connections.
export const mongoClient = globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = mongoClient;

export const db = mongoClient.db(process.env.DB_NAME || "mohollah");
