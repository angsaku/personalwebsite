import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Only proxy Supabase storage URLs
  if (!url.startsWith("https://fzjpbihupkiggcdvynua.supabase.co/")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const res = await fetch(url);
  if (!res.ok) return new NextResponse("Image not found", { status: 404 });

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
