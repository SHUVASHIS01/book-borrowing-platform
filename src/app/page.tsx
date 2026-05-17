"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Book {
  _id: string;
  title: string;
  author: string;
  image_url: string;
  category: string;
}

const testimonials = [
  { name: "Sarah Johnson", text: "BookBorrow has transformed my reading habits. I can access any book without leaving home!", avatar: "SJ" },
  { name: "Mike Chen", text: "The collection is amazing and the borrowing process is incredibly smooth.", avatar: "MC" },
  { name: "Emily Davis", text: "I love how easy it is to find new books. The category filters are super helpful!", avatar: "ED" },
];

const categories = [
  { name: "Story", icon: "📖", count: "500+", color: "bg-purple-100 text-purple-700" },
  { name: "Tech", icon: "💻", count: "300+", color: "bg-blue-100 text-blue-700" },
  { name: "Science", icon: "🔬", count: "400+", color: "bg-green-100 text-green-700" },
];

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?limit=4")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeInDown">
            Find Your Next Read
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp">
            Discover thousands of books across all genres. Borrow, read, and explore — all from the comfort of your home.
          </p>
          <Link
            href="/all-books"
            className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-1s"
          >
            Browse All Books →
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-indigo-600 text-white py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap text-lg font-medium">
          🆕 New Arrivals &nbsp;&nbsp;|&nbsp;&nbsp; 🔥 Trending Books &nbsp;&nbsp;|&nbsp;&nbsp; 💰 Discounts &nbsp;&nbsp;|&nbsp;&nbsp; ⭐ Popular Reads &nbsp;&nbsp;|&nbsp;&nbsp; 📚 Weekly Picks &nbsp;&nbsp;|&nbsp;&nbsp; 🎉 Member Exclusives
        </div>
      </div>

      {/* Featured Books */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Featured Books</h2>
          <p className="text-gray-500 text-lg">Handpicked titles just for you</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Trending Categories</h2>
            <p className="text-gray-500 text-lg">Explore books by your favorite genre</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/all-books?category=${cat.name}`}
                className="card-hover p-8 rounded-xl border border-gray-200 text-center hover:border-indigo-300 block"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${cat.color}`}>
                  {cat.count} Books
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">What Readers Say</h2>
            <p className="text-gray-500 text-lg">Join thousands of happy readers</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      {t.avatar}
                    </div>
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  </div>
                  <p className="text-gray-600 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex gap-1 mt-3 text-yellow-400">
                    {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Reading Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Why Choose BookBorrow?</h2>
            <p className="text-gray-500 text-lg">Benefits of reading with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Instant Access", desc: "Borrow books instantly with just one click" },
              { icon: "📱", title: "Read Anywhere", desc: "Access your books from any device" },
              { icon: "💎", title: "Premium Collection", desc: "Curated selection of top-quality books" },
              { icon: "🔄", title: "Easy Returns", desc: "Hassle-free return process" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-gray-100 card-hover">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
