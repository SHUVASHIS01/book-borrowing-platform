"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-300 transition-shadow">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="text-xl font-bold gradient-text">BookBorrow</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all text-sm">
              Home
            </Link>
            <Link href="/all-books" className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all text-sm">
              All Books
            </Link>
            <Link href="/my-profile" className="px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-all text-sm">
              My Profile
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {session.user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-indigo-700">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-primary-gradient text-white px-6 py-2 rounded-lg font-medium text-sm shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate__animated animate__fadeIn">
            <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white font-medium transition-all">
                Home
              </Link>
              <Link href="/all-books" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white font-medium transition-all">
                All Books
              </Link>
              <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-white font-medium transition-all">
                My Profile
              </Link>
              <div className="border-t border-gray-200 mt-2 pt-2">
                {session ? (
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium text-left transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-lg btn-primary-gradient text-white font-medium text-center">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
