import { useState } from 'react';
import { BrainCircuit, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (!BASE_URL) {
                throw new Error("API URL not configured");
            }

            const endpoint = isLogin ? '/signin' : '/signup';

            const payload = isLogin
                ? { email, password }
                : { username, email, password };

            console.log("API:", `${BASE_URL}/auth${endpoint}`); 

            const response = await axios.post(
                `${BASE_URL}/auth${endpoint}`,
                payload
            );

            console.log("RESPONSE:", response.data); 

            if (response.data?.success) {
                localStorage.setItem(
                    'token',
                    response.data.data.token
                );
                navigate('/dashboard');
            } else {
                setError(response.data?.message || "Signup failed");
            }

        } catch (err: any) {
            console.error("FULL ERROR:", err?.response || err);

            if (err.response) {
                setError(err.response.data?.message || "Server error");
            } else if (err.request) {
                setError("Cannot reach server (backend down or blocked)");
            } else {
                setError(err.message);
            }
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
                    <div className="mb-4 p-3 text-sm text-red-500 text-center border border-red-500/20 bg-red-500/10 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {!isLogin && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-zinc-300">Username</label>
                            <input
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="p-2.5 bg-zinc-950 border border-zinc-800 text-white rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2.5 bg-zinc-950 border border-zinc-800 text-white rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-white rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-10"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {isLogin && (
                            <div className="flex justify-end mt-1">
                                <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                            </div>
                        )}
                    </div>

                    <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 transition-colors py-2.5 rounded-lg text-white font-medium">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
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