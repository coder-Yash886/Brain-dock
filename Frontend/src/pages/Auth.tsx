import { useState } from 'react';
import { BrainCircuit, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    try {
      const endpoint = isLogin ? '/signin' : '/signup';
      const payload = isLogin ? { email, password } : { username, email, password };
      
      const response = await axios.post(`${API_BASE_URL}/auth${endpoint}`, payload);
      
      if (response.data.success) {
        if (!isLogin) {
          
          setIsLogin(true);
          setError('Signup successful! Please Sign In now.');
          setPassword(''); 
        } else {
          
          localStorage.setItem('token', response.data.data.token);
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message ||
          (axiosError.request ? 'Cannot connect to server. Please try again.' : 'Something went wrong')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl">
        
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

        {error && (
          <div className={`mb-4 rounded-lg p-3 text-sm text-center border ${error.includes('successful') ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">Username</label>
              <input
                type="text"
                required
                value={username}
                disabled={isSubmitting}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              required
              value={email}
              disabled={isSubmitting}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 pr-10 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-indigo-500 py-2.5 font-medium text-white hover:bg-indigo-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (isLogin ? 'Signing In...' : 'Signing Up...') : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            type="button"
            disabled={isSubmitting}
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
