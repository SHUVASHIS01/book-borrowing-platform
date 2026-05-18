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
  { name: "Sarah Johnson", text: "BookBorrow has transformed my reading habits. I can access any book without leaving home!", role: "Book Enthusiast" },
  { name: "Mike Chen", text: "The collection is amazing and the borrowing process is incredibly smooth.", role: "Software Engineer" },
  { name: "Emily Davis", text: "I love how easy it is to find new books. The category filters are super helpful!", role: "Student" },
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
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6 animate__animated animate__fadeIn">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Online Book Library</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate__animated animate__fadeInUp">
              Find Your Next
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Great Read
              </span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg animate__animated animate__fadeInUp">
              Browse our curated collection of books across fiction, technology, and science. Borrow with a single click.
            </p>
            <div className="flex flex-wrap gap-4 animate__animated animate__fadeInUp">
              <Link
                href="/all-books"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30"
              >
                Browse Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-7 py-3.5 rounded-xl font-semibold transition-all border border-white/10"
              >
                Join Free
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10 animate__animated animate__fadeIn">
              <div>
                <p className="text-2xl font-bold text-white">1200+</p>
                <p className="text-sm text-slate-400">Books Available</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400">Active Readers</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-slate-400">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 overflow-hidden shadow-lg">
        <div className="marquee whitespace-nowrap text-sm font-medium">
          New Arrivals: The Great Gatsby | Clean Code | Cosmos &nbsp;&nbsp;&mdash;&nbsp;&nbsp; Special Discount on Memberships &nbsp;&nbsp;&mdash;&nbsp;&nbsp; Popular Reads &nbsp;&nbsp;&mdash;&nbsp;&nbsp; Trending: Sapiens | 1984 &nbsp;&nbsp;&mdash;&nbsp;&nbsp; Join Today
        </div>
      </div>

      {/* Featured Books */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Curated for you</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Featured Books</h2>
              <p className="text-slate-500 mt-2">Handpicked titles just for you</p>
            </div>
            <Link href="/all-books" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold group">
              View all
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book._id} book={book} buttonLabel="View Details" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Trending Categories</h2>
            <p className="text-slate-500 mt-2">Explore books by genre</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Story", desc: "Fiction, Fantasy & Adventure", count: "500+", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
              { name: "Tech", desc: "Programming & Development", count: "300+", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
              { name: "Science", desc: "Physics, Biology & Space", count: "400+", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/all-books?category=${cat.name}`}
                className="group relative p-7 rounded-2xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <svg className={`w-7 h-7 bg-gradient-to-r ${cat.gradient} bg-clip-text`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{cat.count} books</span>
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">What Readers Say</h2>
            <p className="text-slate-500 mt-2">Join thousands of happy readers</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-7 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-5">
                    {"★★★★★".split("").map((s, j) => <span key={j} className="text-amber-400 text-lg">{s}</span>)}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md shadow-blue-500/20">
                      <span className="text-white text-sm font-bold">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">Why Choose BookBorrow?</h2>
            <p className="text-slate-500 mt-2">Simple, fast, and reliable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Instant Access", desc: "Borrow books instantly with just one click", icon: "M13 10V3L4 14h7v7l9-11h-7z", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
              { title: "Read Anywhere", desc: "Access your borrowed books from any device", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
              { title: "Premium Collection", desc: "Curated selection of top-quality books", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
              { title: "Easy Returns", desc: "Hassle-free return process when you are done", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <div key={i} className="group text-center p-7 rounded-2xl border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Reading?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">Join BookBorrow today and get instant access to our entire collection of books.</p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5 shadow-lg"
              >
                Get Started Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
