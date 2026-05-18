"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
}

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    if (!isPending && !session) { router.push("/login"); return; }
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => { setBook(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [id, session, isPending, router]);

  const handleBorrow = async () => {
    if (!session) { router.push("/login"); return; }
    setBorrowing(true);
    try {
      const res = await fetch("/api/books/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book?._id }),
      });
      const data = await res.json();
      if (res.ok) { toast.success("Book borrowed successfully!"); setBook(data.book); }
      else { toast.error(data.error || "Failed to borrow book"); }
    } catch { toast.error("Something went wrong"); }
    finally { setBorrowing(false); }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return <div className="text-center py-20"><p className="text-slate-400 font-medium">Book not found.</p></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 relative h-72 md:h-auto md:min-h-[450px]">
            <Image src={book.image_url} alt={book.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
          </div>
          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block w-fit text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              {book.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2">{book.title}</h1>
            <p className="text-slate-400 mb-6 font-medium">by {book.author}</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">{book.description}</p>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-3 h-3 rounded-full ${book.available_quantity > 0 ? "bg-emerald-400" : "bg-red-400"}`} />
              <p className="text-sm font-semibold text-slate-700">
                {book.available_quantity > 0 ? `${book.available_quantity} copies available` : "Currently unavailable"}
              </p>
            </div>
            <button
              onClick={handleBorrow}
              disabled={borrowing || book.available_quantity <= 0}
              className={`w-fit px-8 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                book.available_quantity <= 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
              }`}
            >
              {borrowing ? "Borrowing..." : book.available_quantity <= 0 ? "Not Available" : "Borrow This Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
