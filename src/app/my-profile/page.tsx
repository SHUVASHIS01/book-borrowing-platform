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
    if (!isPending && !session) { router.push("/login"); }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Account</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Your account information</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-blue-600/20">
            {session.user?.image ? (
              <Image src={session.user.image} alt={session.user.name || "User"} width={80} height={80} className="object-cover w-full h-full" />
            ) : (
              <span className="text-2xl font-bold text-white">{session.user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{session.user?.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{session.user?.email}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
            <p className="text-sm text-slate-800 mt-1 font-medium">{session.user?.name}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
            <p className="text-sm text-slate-800 mt-1 font-medium">{session.user?.email}</p>
          </div>
        </div>

        <Link
          href="/update-profile"
          className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Update Profile
        </Link>
      </div>
    </div>
  );
}
