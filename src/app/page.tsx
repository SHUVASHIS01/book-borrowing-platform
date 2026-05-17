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
  { name: "Sarah Johnson", text: "BookBorrow has transformed my reading habits. I can access any book without leaving home!", avatar: "SJ", role: "Book Enthusiast" },
  { name: "Mike Chen", text: "The collection is amazing and the borrowing process is incredibly smooth.", avatar: "MC", role: "Software Engineer" },
  { name: "Emily Davis", text: "I love how easy it is to find new books. The category filters are super helpful!", avatar: "ED", role: "Student" },
];

const categories = [
  { name: "Story", icon: "📖", count: "500+", desc: "Fiction, Fantasy & Adventure" },
  { name: "Tech", icon: "💻", count: "300+", desc: "Programming & Development" },
  { name: "Science", icon: "🔬", count: "400+", desc: "Physics, Biology & Space" },
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
      <section className="hero-gradient text-white py-24 md:py-36 relative">
        <div className="blob w-96 h-96 bg-indigo-500 top-10 left-10"></div>
        <div className="blob w-72 h-72 bg-purple-500 bottom-10 right-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm text-indigo-200 animate__animated animate__fadeInDown">
            Welcome to BookBorrow — Your Digital Library
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate__animated animate__fadeInDown leading-tight">
            Find Your Next
            <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Read</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate__animated animate__fadeInUp leading-relaxed">
            Discover thousands of books across all genres. Borrow, read, and explore — all from the comfort of your home.
          </p>
          <Link
            href="/all-books"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl shadow-black/20 animate__animated animate__fadeInUp animate__delay-1s"
          >
            Browse Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap text-sm font-medium tracking-wide">
          🆕 New Arrivals: The Great Gatsby | Clean Code | Cosmos &nbsp;&nbsp;&bull;&nbsp;&nbsp; 💰 Special Discount on Memberships &nbsp;&nbsp;&bull;&nbsp;&nbsp; ⭐ Popular Reads &nbsp;&nbsp;&bull;&nbsp;&nbsp; 📚 Trending: Sapiens | 1984 &nbsp;&nbsp;&bull;&nbsp;&nbsp; 🎉 Join Today
        </div>
      </div>

      {/* Featured Books */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 section-divider pt-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Featured Books</h2>
          <p className="text-gray-500 text-lg">Handpicked titles just for you</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} buttonLabel="View Details" />
            ))}
          </div>
        )}
      </section>

      {/* Trending Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 section-divider pt-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Trending Categories</h2>
            <p className="text-gray-500 text-lg">Explore books by your favorite genre</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/all-books?category=${cat.name}`}
                className="card-hover p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white text-center block group"
              >
                <div className="text-5xl mb-5 float-animation">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{cat.desc}</p>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
                  {cat.count} Books
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative overflow-hidden">
        <div className="blob w-80 h-80 bg-indigo-300 -top-20 -right-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 section-divider pt-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">What Readers Say</h2>
            <p className="text-gray-500 text-lg">Join thousands of happy readers</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex gap-1 mb-4 text-amber-400 text-sm">
                    {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{t.name}</h4>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 section-divider pt-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Why Choose BookBorrow?</h2>
            <p className="text-gray-500 text-lg">Benefits of reading with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Instant Access", desc: "Borrow books instantly with just one click" },
              { icon: "📱", title: "Read Anywhere", desc: "Access your books from any device" },
              { icon: "💎", title: "Premium Collection", desc: "Curated selection of top-quality books" },
              { icon: "🔄", title: "Easy Returns", desc: "Hassle-free return process" },
            ].map((item, i) => (
              <div key={i} className="text-center p-7 rounded-2xl bg-gradient-to-br from-gray-50 to-white card-hover group">
                <div className="text-4xl mb-4 float-animation" style={{ animationDelay: `${i * 0.3}s` }}>{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
