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
    <div className="card-hover bg-white rounded-2xl overflow-hidden group">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-700 text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm">
            {book.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-400 text-sm mb-4">by {book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="inline-block w-full text-center btn-primary-gradient text-white py-2.5 rounded-xl font-medium text-sm"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
