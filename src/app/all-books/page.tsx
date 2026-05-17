"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  image_url: string;
  category: string;
}

const categories = ["All", "Story", "Tech", "Science"];

function AllBooksContent() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (search) params.set("search", search);

    setLoading(true);
    fetch(`/api/books?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center animate__animated animate__fadeIn">
        All Books
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Categories */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
            <div className="flex flex-row lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 pl-12 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No books found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AllBooksContent />
    </Suspense>
  );
}
