import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold tracking-tight">EduBash</h1>
        <div className="flex items-center gap-6">
          <a href="http://localhost:5173/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
          <a href="http://localhost:5173/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
          <div className="ml-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Welcome to EduBash</h2>
            <p className="mt-2 text-gray-400">Thank you for your support</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-black text-black">
            <SignedOut>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Get started</h3>
                  <p className="text-sm">Access your account and continue where you left off.</p>
                </div>
                <SignInButton>
                  <button className="w-full px-4 py-2 bg-white hover:bg-black text-black hover:text-white font-medium border border-black rounded-md transition-colors">
                    Continue
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Welcome back</h3>
                <p className="text-sm text-gray-400">We're glad to see you again.</p>
                <div className="pt-4 border-t border-gray-800">
                  <button className="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}