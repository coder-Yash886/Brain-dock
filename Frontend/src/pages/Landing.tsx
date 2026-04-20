import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Shield, Zap, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30 text-zinc-100">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/50 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight text-white">MindVault</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/auth')} 
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/auth')} 
              className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-indigo-400 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Your Second Brain is Here
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Store everything.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">
              Forget nothing.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            MindVault helps you save tweets, videos, articles, and ideas in one brilliant, organized place. Access your knowledge anywhere, instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={() => navigate('/auth')} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25"
            >
              Start Your Vault
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-zinc-500 sm:hidden">Free forever. No credit card required.</p>
          </div>
        </div>

        {/* Dashboard Preview Image/Mockup */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-20 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-2 lg:p-4 backdrop-blur-xl shadow-2xl shadow-black/50 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
           <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative bg-zinc-950 flex items-center justify-center border border-zinc-800">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
             <div className="text-zinc-600 flex flex-col items-center gap-4 z-10">
                <Brain className="w-16 h-16 text-indigo-500/20" />
                <p className="font-medium text-lg">Your knowledge universe.</p>
             </div>
           </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 border-t border-zinc-900 bg-zinc-950/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Built for clarity and speed</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Everything you need to organize your digital life, beautifully designed and incredibly fast.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="Lightning Fast"
              desc="Save content instantly. No loading screens, no waiting. Just paste and save."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-emerald-500" />}
              title="Secure Storage"
              desc="Your data is encrypted and securely stored. Only you have access to your vault."
            />
            <FeatureCard 
              icon={<Share2 className="w-6 h-6 text-blue-500" />}
              title="Share the Brain"
              desc="Create public links to share curated collections of your knowledge with anyone."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 text-center text-zinc-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-indigo-500/50" />
          <span className="font-semibold text-zinc-400">MindVault</span>
        </div>
        <p>© 2026 MindVault. Built by and for curious minds.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
