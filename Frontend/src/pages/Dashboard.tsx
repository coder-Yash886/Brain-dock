import { useNavigate } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import AddContentModal from '../components/AddContentModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchContent = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/content', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContents(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex font-sans">
            <Sidebar />

            {/* Main Content Area (Sidebar ke aage) */}
            <div className="flex-1 ml-64 p-8">

                {/* Header */}
                <header className="flex justify-between items-center mb-10 pt-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight h-[40px]">
                        Welcome to your Mind
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Add Knowledge
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-2.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Bento Grid layout for cards */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">

                    {contents.map((item) => (
                        <Card
                            key={item._id}
                            type={item.type as any}
                            title={item.title}
                            link={item.link}
                            tags={item.tags}
                            onDelete={async () => {
                                const token = localStorage.getItem('token');
                                await axios.delete(`http://localhost:5000/api/content/${item._id}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                fetchContent();
                            }}
                        />
                    ))}

                    {/* Fallback Dummy Items if no real content */}
                    {contents.length === 0 && (
                        <>
                            <Card type="tweet" title="Next.js 15 is amazing, server components FTW! 🔥" tags={["nextjs", "react"]} />
                            <Card type="document" title="Ideas for new SaaS Project" tags={["business", "ideas"]} />
                            <Card type="video" title="How to master Tailwind CSS in 2024" tags={["css", "tutorial"]} link="https://youtube.com/something" />
                            <Card type="link" title="Gemini API Documentation" tags={["ai", "docs"]} link="https://ai.google.dev/docs" />
                            <Card type="document" title="Grocery List for Weekend" tags={["personal"]} />
                        </>
                    )}

                </div>
            </div>

            <AddContentModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={() => {
                    setModalOpen(false);
                    fetchContent();
                }}
            />
        </div>
    );
};

export default Dashboard;
