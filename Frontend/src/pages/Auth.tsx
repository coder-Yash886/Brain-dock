import { useState, useEffect } from 'react';
import { BrainCircuit, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { markSessionStart } from '../utils/session';

const BASE_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;


const loadReCaptchaScript = (siteKey: string) => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).grecaptcha) return resolve();
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });
};

const getRecaptchaToken = async (action = 'login'): Promise<string | null> => {
  if (!RECAPTCHA_SITE_KEY) return null;
  await loadReCaptchaScript(RECAPTCHA_SITE_KEY);
  return new Promise((resolve, reject) => {
    try {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then((token: string) => {
          resolve(token);
        }).catch((err: any) => reject(err));
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (RECAPTCHA_SITE_KEY) {
        
        loadReCaptchaScript(RECAPTCHA_SITE_KEY).catch(() => {
          
        });
      }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!BASE_URL) {
                throw new Error("API URL not configured");
            }

            let recaptchaToken: string | null = null;
            try {
              recaptchaToken = await getRecaptchaToken(isLogin ? 'signin' : 'signup');
            } catch (err) {
              console.warn('reCAPTCHA execution failed', err);
            }

            if (isLogin) {
                const response = await axios.post(`${BASE_URL}/auth/signin`, {
                    email, password, recaptchaToken
                });
                if (response.data?.success) {
                    localStorage.setItem('token', response.data.data.token);
                    markSessionStart();
                    navigate('/dashboard');
                } else {
                    setError(response.data?.message || "Signin failed");
                }
            } else {
                if (step === 1) {
                    const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
                        username, email, recaptchaToken
                    });
                    if (response.data?.success) {
                        setStep(2);
                    } else {
                        setError(response.data?.message || "Failed to send OTP");
                    }
                } else if (step === 2) {
                    const response = await axios.post(`${BASE_URL}/auth/signup`, {
                        username, email, password, otp, recaptchaToken
                    });
                    if (response.data?.success) {
                        localStorage.setItem('token', response.data.data.token);
                        markSessionStart();
                        navigate('/dashboard');
                    } else {
                        setError(response.data?.message || "Signup failed");
                    }
                }
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
        } finally {
            setIsLoading(false);
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

                    {!isLogin && step === 2 ? (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-zinc-300">Enter Verification Code</label>
                            <input
                                type="text"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                className="p-2.5 bg-zinc-950 border border-zinc-800 text-white rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all tracking-widest text-center text-lg font-mono"
                            />
                            <p className="text-xs text-zinc-500 text-center mt-2">Code sent to {email}</p>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 text-center transition-colors"
                            >
                                Change details
                            </button>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}

                    <button 
                        disabled={isLoading}
                        className="mt-2 bg-indigo-500 hover:bg-indigo-600 transition-colors py-2.5 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : (!isLogin && step === 1 ? 'Send OTP' : 'Verify & Sign Up'))}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setStep(1);
                            setError('');
                            setOtp('');
                        }}
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