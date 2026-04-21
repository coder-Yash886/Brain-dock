import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Shield, Zap, Share2, Sparkles, Layers, Search, Github, Twitter as TwitterIcon, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] font-sans selection:bg-indigo-500/30 text-zinc-100 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />

      {/* Premium Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Braindock</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How it works</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="relative group px-5 py-2.5 rounded-full overflow-hidden text-sm font-medium text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
              <span className="relative z-10">Get Started Free</span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 mx-6 rounded-xl border border-zinc-800 bg-zinc-900/95 p-4">
            <div className="flex flex-col gap-3 text-sm font-medium text-zinc-300">
              <button onClick={() => { scrollToSection('features'); setMobileMenuOpen(false); }} className="text-left hover:text-white transition-colors">Features</button>
              <button onClick={() => { scrollToSection('how-it-works'); setMobileMenuOpen(false); }} className="text-left hover:text-white transition-colors">How it works</button>
              <button onClick={() => { scrollToSection('faq'); setMobileMenuOpen(false); }} className="text-left hover:text-white transition-colors">FAQ</button>
              <button
                onClick={() => navigate('/auth')}
                className="mt-2 w-full rounded-lg bg-indigo-500 py-2.5 text-white hover:bg-indigo-600 transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 lg:pt-52 pb-20 overflow-hidden flex flex-col items-center text-center px-6">
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ultimate knowledge manager for thinkers</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Your brain's external <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient">
              hard drive.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '200ms' }}>
            Stop losing brilliant ideas in endless bookmarks. MindVault gives you a beautiful, blazing-fast workspace to save, organize, and share your digital life.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Start Your Vault
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Everything in one place</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Designed to keep you in the flow, not distracted by clutter.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Layers className="w-6 h-6 text-indigo-400" />}
              title="Organize Anything"
              desc="Save tweets, YouTube videos, long-form articles, and quick text notes. Custom tags make everything easy to filter."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Blazing Fast UI"
              desc="No loading spinners. Built on a modern tech stack to ensure your thoughts are saved the millisecond you hit enter."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-emerald-400" />}
              title="Private by Default"
              desc="Your data is yours. Secure authentication means nobody else can access your vault unless you explicitly share it."
            />
            <FeatureCard
              icon={<Search className="w-6 h-6 text-blue-400" />}
              title="Instant Retrieval"
              desc="Click a tag and instantly see all matched content perfectly arranged in a beautiful, masonry-style grid."
            />
            <FeatureCard
              icon={<Share2 className="w-6 h-6 text-purple-400" />}
              title="Share Your Brain"
              desc="Generate a secure public link. Let others explore your curated collections without signing in."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-pink-400" />}
              title="Distraction Free"
              desc="A dark, immersive full-screen preview mode built so you can actually read and digest your saved content."
            />
          </div>
        </div>
      </section>

      {/* Clean Premium Footer */}
      <footer className="border-t border-white/5 bg-[#09090b] pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-6 h-6 text-indigo-500" />
                <span className="text-xl font-bold tracking-tight text-white">Braindock</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
                The most elegant way to capture, organize, and share your digital knowledge. Engineered for thinkers.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://x.com/YashK47662" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="https://github.com/coder-Yash886" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/yash-kumar-2a7076325/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">

            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              Made with <Sparkles className="w-4 h-4 text-indigo-500" /> for curious minds
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 hover:border-indigo-500/20 transition-all duration-500">
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default Landing;
