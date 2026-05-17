import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  const book = await Book.findById(id);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
