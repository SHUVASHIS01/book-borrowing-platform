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
    <div className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
            {book.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{book.title}</h3>
        <p className="text-slate-400 text-sm mb-4">by {book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
