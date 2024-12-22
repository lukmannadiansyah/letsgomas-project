import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

const uploadDir = path.join(process.cwd(), "public", "images");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error during file upload:", err);
      res.status(500).json({ error: "File upload failed" });
      return;
    }

    const filePaths: Record<string, string> = {};
    const images = Array.isArray(files.images) ? files.images : [files.images];

    (images as formidable.File[]).forEach((file, index) => {
      if (file) {
        const newFilePath = `/images/${file.newFilename}`;
        filePaths[`image${index + 1}`] = newFilePath;
      }
    });

    res.status(200).json(filePaths);
  });
};

export default uploadHandler;
