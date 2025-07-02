import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://mrwxrld9:4cYMzKdP7maoib1D@loopa-cluster.xn9hlvc.mongodb.net/loopa_db?retryWrites=true&w=majority';

async function run() {
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    await client.connect();
    console.log('Connected to MongoDB!');
    await client.close();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

run();