import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://piotreknie:mMNMIYvcXl9zK47o@cluster0.zyimvxf.mongodb.net/my-site-dev?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  return client;
}
