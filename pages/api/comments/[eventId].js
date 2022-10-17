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

function handler(req, res) {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      date,
      email,
      name,
      comment,
    };

    const filePath = buildCommentPath();
    const data = extractComment(filePath);
    const getEventId = data.filter((comment) => comment.id === eventId);

    if (getEventId.length === 0) {
      data.push({
        id: eventId,
        comments: [newComment],
      });
      fs.writeFileSync(filePath, JSON.stringify(data));

      return res.status(201).json({ message: "Success!", comments: data });
    }

    getEventId[0].comments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));

    return res
      .status(201)
      .json({ message: "Success!", comments: getEventId[0].comments });
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
}

export default handler;
