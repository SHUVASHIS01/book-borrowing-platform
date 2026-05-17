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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-indigo-600">BookBorrow</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/all-books" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              All Books
            </Link>
            {session && (
              <Link href="/my-profile" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                My Profile
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  Hi, {session.user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="flex flex-col gap-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2">
                Home
              </Link>
              <Link href="/all-books" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2">
                All Books
              </Link>
              {session && (
                <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2">
                  My Profile
                </Link>
              )}
              {session ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-left"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
