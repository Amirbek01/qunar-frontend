import { useUserStore } from '@/store/useUserStore';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const { user, logout } = useUserStore();
    const [search, setSearch] = useState('');

    return (
        <header className="w-full bg-transparent absolute top-0 left-0 z-50">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-5 px-8">
                {/* Логотип */}
                <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img src="/logo.png" alt="QUNAR Logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-white">QUNAR</span>
                    </div>
                </Link>

                {/* Навигация */}
                <ul className="hidden md:flex gap-8 text-white font-medium">
                    <li><Link href="/">Домой</Link></li>
                    <li><Link href="/products">Продукты</Link></li>
                    <li><Link href="/sustainability">Устойчивость</Link></li>
                    <li><Link href="/about">О нас</Link></li>
                    <li><Link href="/ai">QUNAR.AI</Link></li>
                </ul>

                {/* Поиск + Иконки */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск..."
                            className="rounded-full py-1 pl-4 pr-10 bg-white/80 text-gray-700 focus:outline-none"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-600 cursor-pointer" />
                    </div>

                    <Link href="/busket">
                        <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-green-400" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                            <FaUserCircle className="text-white text-2xl hover:text-red-400" />
                            <span className="text-white hidden md:block">Выйти</span>
                        </div>
                    ) : (
                        <Link href="/auth">
                            <FaUserCircle className="text-white text-2xl cursor-pointer hover:text-green-400" />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
