"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) { router.push("/login"); return; }
    if (session?.user) { setName(session.user.name || ""); setImage(session.user.image || ""); }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({ name, image: image || undefined });
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    } catch { toast.error("Failed to update profile"); }
    finally { setLoading(false); }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-sm mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Settings</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Update Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Change your name and profile image</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 p-7 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" placeholder="https://example.com/photo.jpg" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 border-2 border-slate-200 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 shadow-md shadow-blue-600/20">
              {loading ? "Updating..." : "Update Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
