import { MongoClient } from "mongodb";

import fs from "fs";
import path from "path";

export function buildCommentPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractComment(filePath) {
  const fileData = fs.readFileSync(filePath);

  return JSON.parse(fileData);
}

// export function addNewComment()

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://piotrnie:4LevqnP01aTVwtuz@cluster0.zyimvxf.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { date, email, name, comment } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment.trim() === ""
    )
      return res.status(422).json({ message: "Invalid input!" });

    const newComment = {
      eventId,
      date,
      email,
      name,
      comment,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    return res.status(200).json({ message: "Success!", comment: newComment });
  }

  if (req.method === "GET") {
    const filePath = buildCommentPath();
    const data = extractComment(filePath);
    const getEventId = data.filter((comment) => comment.id === eventId);

    if (getEventId.length === 0)
      return res.status(409).json({ message: "No comments!" });

    return res
      .status(201)
      .json({ message: "Success!", comments: getEventId[0].comments });
  }

  client.close();
}

export default handler;
