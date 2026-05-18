import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const limit = searchParams.get("limit");

  let query: Record<string, unknown> = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let booksQuery = Book.find(query).lean().sort({ createdAt: -1 });

  if (limit) {
    booksQuery = booksQuery.limit(parseInt(limit));
  }

  const books = await booksQuery;

  const response = NextResponse.json(books);
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  return response;
}
