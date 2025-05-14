"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col bg-[#9ab581] items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Sign In</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
      <p className="mt-6 text-gray-500 text-sm">
        Only approved users can log in.
      </p>
    </div>
  );
}
