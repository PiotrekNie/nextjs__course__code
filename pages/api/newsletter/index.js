import { connectDatabase, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@"))
      return res.status(422).json({ message: "Invalid e-mail address." });

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: err.message });

      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: err.message });

      return;
    }

    return res.status(201).json({ message: "Success!" });
  }
}

export default handler;
