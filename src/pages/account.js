import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function Account() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const isActive = (path) => router.pathname === path;

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Хедер */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/qunar-logo-circle.png" alt="QUNAR.AI" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold">QUNAR</span>
                    </Link>
                    <nav className="hidden md:flex gap-8 font-semibold">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/product" className="hover:text-green-300 transition">Qunar Маркет</Link>
                        <Link href="/about" className="hover:text-green-300 transition">О нас</Link>
                        <Link href="/ai" className="hover:text-green-300 transition">Qunar AI</Link>

                    </nav>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/busket" className="hover:text-green-300 transition">
                            <FaShoppingCart size={24} />
                        </Link>
                        <Link href="/account" className="hover:text-green-300 transition">
                            <FaUserCircle size={24} />
                        </Link>
                    </div>
                    <button className="md:hidden p-2 hover:bg-green-700 rounded-full transition" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-[#196F3D] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Главная</Link>
                        <Link href="/product" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Маркетплейс</Link>
                        <Link href="/about" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <Link href="/subscriptions" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Подписка</Link>
                        <Link href="/busket" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Корзина</Link>
                        <Link href="/account" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Аккаунт</Link>
                    </div>
                )}
            </header>


            <main className="flex-1 max-w-5xl mx-auto px-4 py-32">
    <div className="bg-white p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold mb-4 text-gray-800">Добро пожаловать,</h2>
        <p className="text-2xl text-gray-600 font-medium mb-10">
            {user.name || 'пользователь'} 👋
        </p>

        <div className="flex flex-col items-center gap-6">
            

            <button
                className="w-64 bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-full"
                onClick={() => router.push('/subscriptions')}
            >
                💳 Подписка / QUNAR PRO
            </button>

            <button
                className="w-64 bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-full"
                onClick={() => router.push('/ai')}
            >
                🧠 Чат с ИИ
            </button>

            <button
                className="w-64 bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform text-white font-semibold py-3 rounded-full"
                onClick={handleLogout}
            >
                🚪 Выйти
            </button>
        </div>
    </div>
</main>

            {/* Футер */}
            <footer className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
