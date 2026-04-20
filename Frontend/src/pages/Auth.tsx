import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/signin' : '/signup';
      const payload = isLogin ? { email, password } : { username, email, password };
      
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, payload);
      
      if (response.data.success) {
        if (!isLogin) {
          // Agar Signup hua hai, to successfully login screen par bhej dein
          setIsLogin(true);
          setError('Signup successful! Please Sign In now.');
          setPassword(''); // For security, password clear kar dete hain
        } else {
          // Agar Login hua hai, to token save karke Dashboard par bhej dein
          localStorage.setItem('token', response.data.data.token);
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <p className="mt-6 text-center text-sm text-zinc-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            type="button"
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
