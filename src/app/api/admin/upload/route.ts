import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { internalServerError } from "@/lib/api-error";
import { requireAdminApiAccess } from "@/lib/admin-auth";

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const;

export async function POST(request: NextRequest) {
  const denied = await requireAdminApiAccess(request);
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mime = file.type;
    if (!VALID_MIME_TYPES.includes(mime as (typeof VALID_MIME_TYPES)[number])) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const originalName =
      "name" in file && typeof (file as File).name === "string" ? (file as File).name : "upload.jpg";
    const extFromName = originalName.split(".").pop()?.toLowerCase();
    const extFromMime =
      mime === "image/png"
        ? "png"
        : mime === "image/webp"
          ? "webp"
          : mime === "image/gif"
            ? "gif"
            : mime === "image/svg+xml"
              ? "svg"
              : "jpg";
    const ext =
      extFromName && ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(extFromName)
        ? extFromName.replace("jpeg", "jpg")
        : extFromMime;

    const folderRaw = formData.get("folder");
    const folder = folderRaw === "logos" ? "logos" : "team";
    const filename = `${folder === "logos" ? "logo" : "team"}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, filename), buffer);

    const url = `/uploads/${folder}/${filename}`;

    return NextResponse.json({ url, filename });
  } catch (err) {
    return internalServerError("upload API", err);
  }
}
