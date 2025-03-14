import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (invalid: React.FormEvent) => {
    invalid.preventDefault(); // ensure form is complete
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-transparent p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg" />
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg">
            Login
          </button>
        </form>
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t"></div>
        </div>
        <button className="w-full bg-white text-black py-2 rounded-lg flex items-center justify-center border border-black">
          <img src="/images/icons8-google-50.png" alt="Google" className="w-5 h-5 mr-2 ml-2" />
          <span className="flex-1 text-center">Sign in with Google</span>
        </button>
        <button className="w-full mt-4 bg-white text-black py-2 rounded-lg flex items-center justify-center border border-black">
          <img src="/images/icons8-github-50.png" alt="GitHub" className="w-5 h-5 mr-2 ml-2" />
          <span className="flex-1 text-center">Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
