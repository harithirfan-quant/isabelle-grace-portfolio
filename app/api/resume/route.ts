import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = join(process.cwd(), "public", "resume.pdf");

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "Resume file not found." },
      { status: 404 }
    );
  }

  const file = readFileSync(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Isabelle-Grace-Resume.pdf"',
      "Cache-Control": "no-store",
      "X-Resume-Updated": "August 2026",
    },
  });
}
