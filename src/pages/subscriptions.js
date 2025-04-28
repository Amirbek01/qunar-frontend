import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function SubscriptionsPage() {
    const router = useRouter();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [upgrading, setUpgrading] = useState(false);
    const [error, setError] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        fetch('https://vencera.tech/qunarBack/subscriptions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setPlan(data.plan || 'free');
        })
        .catch(() => setError('Ошибка при загрузке подписки'))
        .finally(() => setLoading(false));
    }, []);

    const handleUpgrade = async () => {
        setUpgrading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://vencera.tech/qunarBack/subscriptions/upgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ plan: 'pro' })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Ошибка при переходе на Pro');
            }

            const data = await res.json();
            window.location.href = data.url;
        } catch (err) {
            setError(err.message);
        } finally {
            setUpgrading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Хедер */}
            <header className="fixed top-0 w-full  bg-green-700 text-white shadow-lg z-20">
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
                        <Link href="/" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">Главная</Link>
                        <Link href="/product" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">Маркетплейс</Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">О нас</Link>
                        <Link href="/subscriptions" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">Подписка</Link>
                        <Link href="/busket" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">Корзина</Link>
                        <Link href="/account" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-200 transition">Аккаунт</Link>
                    </div>
                )}
            </header>

            {/* Контент */}
            <main className="flex flex-1 items-center justify-center px-4 pt-12">
                <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg">
                    <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Моя подписка</h2>

                    {loading ? (
                        <p className="text-center">Загрузка подписки...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <>
                            <p className="text-lg mb-6 text-center">
                                Текущий план: <span className={`font-bold ${plan === 'pro' ? 'text-green-600' : 'text-gray-700'}`}>{plan === 'pro' ? 'PRO 🔥' : 'Free 💡'}</span>
                            </p>

                            {plan === 'free' && (
                                <>
                                    <h3 className="font-semibold mb-2">Что даёт подписка PRO:</h3>
                                    <ul className="list-disc list-inside mb-6 text-gray-700">
                                        <li>Доступ к QUNAR AI чату</li>
                                        <li>Расширенные фильтры и инструменты</li>
                                        <li>Приоритетная поддержка</li>
                                    </ul>

                                    <button
                                        onClick={handleUpgrade}
                                        disabled={upgrading}
                                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition ${upgrading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {upgrading ? 'Переход на PRO...' : 'Купить PRO подписку'}
                                    </button>
                                </>
                            )}

                            {plan === 'pro' && (
                                <p className="text-center text-green-700 font-semibold text-lg">Вы уже пользуетесь PRO-функциями ✅</p>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Футер */}
            <footer className=" bg-green-700 text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
