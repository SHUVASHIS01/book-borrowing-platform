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
        <p className="text-gray-500 text-lg">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate__animated animate__fadeIn">
        <div className="flex flex-col md:flex-row">
          {/* Book Image */}
          <div className="md:w-1/3 relative h-80 md:h-auto">
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Book Info */}
          <div className="md:w-2/3 p-8 md:p-12">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium mb-4">
              {book.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {book.title}
            </h1>
            <p className="text-lg text-gray-500 mb-6">by {book.author}</p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {book.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-500">Available</span>
                <p className="text-xl font-bold text-gray-800">{book.available_quantity}</p>
              </div>
            </div>

            <button
              onClick={handleBorrow}
              disabled={borrowing || book.available_quantity <= 0}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                book.available_quantity <= 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105"
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
