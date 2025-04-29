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

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="fixed top-0 w-full bg-green-700 text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/qunar-logo-circle.png" alt="QUNAR.AI" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold">QUNAR</span>
                    </Link>
                    <nav className="hidden md:flex gap-8 font-semibold">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/product" className="hover:text-green-300 transition">QunarMarket</Link>
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
                    <button
                        className="md:hidden p-2 hover:bg-green-800 rounded-full transition"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-green-800 px-6 py-4 space-y-3">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="block text-white">Главная</Link>
                        <Link href="/product" onClick={() => setMenuOpen(false)} className="block text-white">Маркетплейс</Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-white">О нас</Link>
                        <Link href="/ai" onClick={() => setMenuOpen(false)} className="block text-white">Qunar AI</Link>
                    </div>
                )}
            </header>

            <main className="flex-1 w-full px-4 pt-32 pb-16">
                <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-10 rounded-2xl shadow-xl">
                    {/* Левая часть — профиль */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-200 rounded-full p-5">
                            <FaUserCircle size={80} className="text-gray-600" />
                        </div>
                        <h2 className="text-3xl font-bold mt-6 text-gray-800">{user.name || 'Имя пользователя'}</h2>
                        <button
                            onClick={handleLogout}
                            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
                        >
                            Выйти
                        </button>
                    </div>

                    {/* Правая часть — кнопки */}
                    <div className="flex flex-col justify-center items-center gap-6">
                        <Link href="/subscriptions" className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-center text-lg font-semibold transition">
                            Qunar PRO
                        </Link>
                        <Link href="/ai" className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-center text-lg font-semibold transition">
                            Qunar AI
                        </Link>
                    </div>
                </div>
            </main>


            <footer className="bg-green-700 text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
