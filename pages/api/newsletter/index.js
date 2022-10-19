import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@"))
      return res.status(422).json({ message: "Invalid e-mail address." });

    const client = await MongoClient.connect(
      "mongodb+srv://piotrnie:4LevqnP01aTVwtuz@cluster0.zyimvxf.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    return res.status(201).json({ message: "Success!" });
  }
}

export default handler;
