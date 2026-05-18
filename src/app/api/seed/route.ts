import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/lib/models/Book";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American Dream set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
    category: "Story",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of young Scout Finch.",
    category: "Story",
    available_quantity: 3,
    image_url: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian masterpiece exploring totalitarianism, surveillance, and the power of language in a world where Big Brother is always watching.",
    category: "Story",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical novel about a young Andalusian shepherd who travels to Egypt searching for treasure and discovers his personal legend.",
    category: "Story",
    available_quantity: 6,
    image_url: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship that teaches developers how to write readable, maintainable, and elegant code.",
    category: "Tech",
    available_quantity: 2,
    image_url: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description: "A deep dive into JavaScript's most elegant features, filtering out the bad parts to help developers write better code.",
    category: "Tech",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    description: "The classic reference for object-oriented design patterns that every software engineer should know.",
    category: "Tech",
    available_quantity: 3,
    image_url: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description: "A guide to becoming a better programmer through practical advice, tips, and techniques for modern software development.",
    category: "Tech",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "A landmark volume in science writing that explores the nature of time, black holes, and the origins of the universe.",
    category: "Science",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    description: "A sweeping exploration of the universe, from the smallest atoms to the largest galaxies, told with wonder and scientific rigor.",
    category: "Science",
    available_quantity: 3,
    image_url: "https://covers.openlibrary.org/b/isbn/9780345539434-L.jpg",
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    description: "An intimate history of the gene, exploring how genetics has shaped humanity's past, present, and future.",
    category: "Science",
    available_quantity: 2,
    image_url: "https://covers.openlibrary.org/b/isbn/9781476733524-L.jpg",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A groundbreaking narrative of humanity's creation and evolution, exploring how Homo sapiens came to dominate the world.",
    category: "Science",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
];

export async function GET() {
  try {
    await dbConnect();
    await Book.deleteMany({});
    await Book.insertMany(books);
    return NextResponse.json({ message: "Database seeded with 12 books!" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
  }
}
