import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Auth Card */}
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl">
        
        {/* Logo & Headline */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="bg-indigo-500/10 p-3 rounded-full mb-2">
            <BrainCircuit className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-zinc-400 text-sm">
            {isLogin
              ? 'Enter your details to access your Second Brain'
              : 'Start organizing your knowledge today'}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">Username</label>
              <input
                type="text"
                placeholder="johndoe"
                className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-indigo-500 py-2.5 font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Auth;
