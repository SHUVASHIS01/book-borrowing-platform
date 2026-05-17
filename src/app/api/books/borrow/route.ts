import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { bookId } = await request.json();

  const book = await Book.findById(bookId);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  if (book.available_quantity <= 0) {
    return NextResponse.json({ error: "Book is not available" }, { status: 400 });
  }

  book.available_quantity -= 1;
  await book.save();

  return NextResponse.json({ message: "Book borrowed successfully", book });
}
