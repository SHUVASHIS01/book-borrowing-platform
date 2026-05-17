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
    if (!isPending && !session) {
      router.push("/login");
      return;
    }

    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, session, isPending, router]);

  const handleBorrow = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setBorrowing(true);
    try {
      const res = await fetch("/api/books/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book?._id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Book borrowed successfully!");
        setBook(data.book);
      } else {
        toast.error(data.error || "Failed to borrow book");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setBorrowing(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-400 text-lg">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate__animated animate__fadeIn">
        <div className="flex flex-col md:flex-row">
          {/* Book Image */}
          <div className="md:w-2/5 relative h-80 md:h-auto md:min-h-[500px]">
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r"></div>
          </div>

          {/* Book Info */}
          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block w-fit bg-indigo-50 text-indigo-600 text-xs px-3 py-1.5 rounded-full font-semibold mb-4 uppercase tracking-wider">
              {book.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-lg text-gray-400 mb-6">by <span className="text-gray-600 font-medium">{book.author}</span></p>
            <p className="text-gray-500 leading-relaxed mb-8">
              {book.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-5 py-3 rounded-xl border border-gray-200">
                <p className="text-lg font-bold text-gray-800">{book.available_quantity} copies left</p>
              </div>
            </div>

            <button
              onClick={handleBorrow}
              disabled={borrowing || book.available_quantity <= 0}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all w-fit relative overflow-hidden ${
                book.available_quantity <= 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "btn-primary-gradient text-white shadow-lg shadow-indigo-200 hover:shadow-xl"
              }`}
            >
              {borrowing
                ? "Borrowing..."
                : book.available_quantity <= 0
                ? "Not Available"
                : "Borrow This Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
