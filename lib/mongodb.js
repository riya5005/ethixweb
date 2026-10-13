import dns from "dns";
import { MongoClient } from "mongodb";

// Local fix for networks that block MongoDB's DNS lookup. Remove before deploying.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// One shared connection, reused across requests (important on Vercel and in dev reloads).
export async function leadsCollection() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Check .env.local and restart the server.");
  if (!global._mongo) {
    global._mongo = new MongoClient(process.env.MONGODB_URI).connect().catch((err) => {
      global._mongo = null; // forget the failure so the next request can retry
      throw err;
    });
  }
  const client = await global._mongo;
  return client.db("ethixweb").collection("leads");
}