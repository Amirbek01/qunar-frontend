import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    }

    return (
        <header className="w-full bg-transparent absolute top-0 left-0 z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-5 px-8">
                {/* Логотип */}
                <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img src="/logo.png" alt="QUNAR Logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                            QUNAR
                        </span>
                    </div>
                </Link>

                <ul className="hidden md:flex gap-8 text-white font-medium">
                    <li>
                        <button
                            type="button"
                            onClick={() => {
                                const el = document.getElementById('products');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                    setTimeout(() => router.replace('/', undefined, { scroll: false }), 1000);
                                }
                            }}
                            className="bg-transparent text-white"
                        >
                            Продукты
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                const el = document.getElementById('sustainability');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                    setTimeout(() => router.replace('/', undefined, { scroll: false }), 1000);
                                }
                            }}
                            className="bg-transparent text-white"
                        >
                            Устойчивость
                        </button>
                    </li>
                    <li>
                        <Link href="/about" className="text-white">
                            О нас
                        </Link>
                    </li>
                    <li>
                        <Link href="/ai" className="text-white">
                            QUNAR.AI
                        </Link>
                    </li>
                </ul>

                {/* Поиск + Иконки */}
                <div className="flex items-center gap-6">
                    <Link href="/busket">
                        <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-green-400" />
                    </Link>

                    {isLoggedIn ? (
                        <Link href="/account" className="flex items-center gap-2">
                            <FaUserCircle className="text-white text-2xl hover:text-green-400" />
                            <span className="text-white hidden md:block">Профиль</span>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="flex items-center gap-1">
                                <FaUserCircle className="text-white text-2xl cursor-pointer hover:text-green-400" />
                                <span className="text-white hidden md:block">Вход</span>
                            </Link>
                            <Link href="/register" className="text-white underline hidden md:block">
                                Регистрация
                            </Link>
                        </>
                    )}

                </div>
            </nav>
        </header>
    );
}
