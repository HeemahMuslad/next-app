"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-[50%] mx-auto mt-40">
      <h1 className="text-center font-bold mb-10">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-500  placeholder-slate-400 focus:outline-none focus:border-gray-900 focus:ring-gray-900 block w-full rounded-md sm:text-sm focus:ring-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
            Password:
          </label>

          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-500 placeholder-slate-400 focus:outline-none focus:border-gray-900 focus:ring-gray-900 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-900 w-full text-white p-4 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
