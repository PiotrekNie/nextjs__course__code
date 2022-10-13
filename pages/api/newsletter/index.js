import fs from "fs";
import path from "path";

export function buildNewsletterPath() {
  return path.join(process.cwd(), "data", "newsletter.json");
}

export function extractNewsletter(filePath) {
  const fileData = fs.readFileSync(filePath);

  return JSON.parse(fileData);
}

function handler(req, res) {
  const email = req.body.email;

  const newEmail = {
    id: new Date().toISOString(),
    email: email,
  };

  const filePath = buildNewsletterPath();
  const data = extractNewsletter(filePath);

  const findEmail = data.some((e) => e.email === email);

  if (!findEmail) {
    data.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(201).json({ message: "Success!", newsletter: findEmail });
  }

  return res.status(409).json({ message: "Email exists!" });
}

export default handler;
