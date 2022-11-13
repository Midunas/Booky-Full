// import { MongoClient } from 'mongodb';
// const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_DB = process.env.DB_NAME;

// if (!MONGODB_URI) {
//   throw new Error('Define the MONGODB_URI environmental variable');
// }

// if (!MONGODB_DB) {
//   throw new Error('Define the MONGODB_DB environmental variable');
// }

// let cachedClient
// let cachedDb

// export async function connectToDatabase() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }

//   // set the connection options
//   const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   // Connect to cluster
//   let client = new MongoClient(MONGODB_URI, options);
//   await client.connect();
//   let db = client.db(MONGODB_DB);

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }
import mongoose from "mongoose"

const connection = {}

async function connect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI)
  connection.isConnected = db.connections[0].readyState;

}

export default connect;
