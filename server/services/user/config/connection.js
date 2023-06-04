const { MongoClient } = require("mongodb");

const uri =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri);

let database;

async function connectToMongoDB() {
  try {
    database = client.db("balenciaga_clone");
    return database;
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

function getDB() {
  return database;
}

connectToMongoDB();

module.exports = { connectToMongoDB, getDB };
