"use client";

import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: {
    _id: string;
    title: string;
    author: string;
    image_url: string;
    category: string;
  };
  buttonLabel?: string;
}

export default function BookCard({ book, buttonLabel = "Details" }: BookCardProps) {
  return (
    <div className="card-hover bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative h-52 w-full">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {book.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-500 text-sm mb-4">by {book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
