import mongoose from "mongoose";
import Book from "./models/Book";

const MONGODB_URI = process.env.MONGODB_URI || "";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American Dream set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
    category: "Story",
    available_quantity: 5,
    image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of young Scout Finch.",
    category: "Story",
    available_quantity: 3,
    image_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian masterpiece exploring totalitarianism, surveillance, and the power of language in a world where Big Brother is always watching.",
    category: "Story",
    available_quantity: 4,
    image_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical novel about a young Andalusian shepherd who travels to Egypt searching for treasure and discovers his personal legend.",
    category: "Story",
    available_quantity: 6,
    image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship that teaches developers how to write readable, maintainable, and elegant code.",
    category: "Tech",
    available_quantity: 2,
    image_url: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=400&h=600&fit=crop",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description: "A deep dive into JavaScript's most elegant features, filtering out the bad parts to help developers write better code.",
    category: "Tech",
    available_quantity: 4,
    image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=600&fit=crop",
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    description: "The classic reference for object-oriented design patterns that every software engineer should know.",
    category: "Tech",
    available_quantity: 3,
    image_url: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=600&fit=crop",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description: "A guide to becoming a better programmer through practical advice, tips, and techniques for modern software development.",
    category: "Tech",
    available_quantity: 5,
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "A landmark volume in science writing that explores the nature of time, black holes, and the origins of the universe.",
    category: "Science",
    available_quantity: 4,
    image_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    description: "A sweeping exploration of the universe, from the smallest atoms to the largest galaxies, told with wonder and scientific rigor.",
    category: "Science",
    available_quantity: 3,
    image_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop",
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    description: "An intimate history of the gene, exploring how genetics has shaped humanity's past, present, and future.",
    category: "Science",
    available_quantity: 2,
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=600&fit=crop",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A groundbreaking narrative of humanity's creation and evolution, exploring how Homo sapiens came to dominate the world.",
    category: "Science",
    available_quantity: 5,
    image_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Book.deleteMany({});
    console.log("Cleared existing books");

    await Book.insertMany(books);
    console.log("Seeded 12 books successfully!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
