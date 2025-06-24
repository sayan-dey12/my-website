// File: app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ loggedIn: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
