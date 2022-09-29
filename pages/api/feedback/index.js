import fs from "fs";
import path from "path";

export function buldFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);

  return JSON.parse(fileData);
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedback,
    };

    // store that in a database or in a file
    const filePath = buldFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(201).json({ message: "Success!", feedback: newFeedback });
  }

  const filePath = buldFeedbackPath();
  const data = extractFeedback(filePath);

  res.status(200).json({ feedback: data });
}

export default handler;
