import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subida a Cloudinary
    const response = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: "smoke-shop",
            resource_type: "image",
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        }).end(buffer);
    });

    const upload = response;

    return NextResponse.json({
      url: upload.secure_url,
      public_id: upload.public_id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
