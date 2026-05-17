"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate__animated animate__fadeIn">
        {/* Header Banner */}
        <div className="hero-gradient h-32"></div>

        {/* Profile Content */}
        <div className="px-8 pb-8 -mt-16">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-indigo-600 flex items-center justify-center">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Info */}
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              {session.user?.name}
            </h1>
            <p className="text-gray-500 mt-1">{session.user?.email}</p>

            {/* Details Card */}
            <div className="w-full mt-8 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{session.user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{session.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Update Button */}
            <Link
              href="/update-profile"
              className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
