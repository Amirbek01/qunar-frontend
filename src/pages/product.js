import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBusketStore } from '@/store/useBusketStore';
import Link from 'next/link';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";


export default function ProductPage() {
    const router = useRouter();
    const { addToBusket } = useBusketStore();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);


    const limit = 12;

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchQuery, page]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const fetchCategories = async () => {
        try {
            const res = await fetch('https://vencera.tech/qunarBack/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                category: selectedCategory,
                search: searchQuery,
                page,
                limit,
            });
            const res = await fetch(`https://vencera.tech/qunarBack/products?${params.toString()}`);
            const data = await res.json();
            setProducts(data);
            setTotalPages(1);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (product) => {
        addToBusket({
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            image: product.image || '/placeholder.png',
            quantity: 1
        });
        setToast(`Добавлено: ${product.name}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Хедер */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    {/* Лого */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="/qunar-logo-circle.png" alt="QUNAR Logo" className="h-10 w-10" />
                        <span className="text-2xl font-extrabold">Qunar Market</span>
                    </Link>

                    {/* Навигация */}
                    <nav className="hidden md:flex space-x-8 items-center text-lg">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/busket" className="flex items-center gap-1 hover:text-green-300 transition">
                            <FaShoppingCart /> Корзина
                        </Link>
                    </nav>

                    {/* Бургер меню на мобилках */}
                    <button
                        className="md:hidden p-2 hover:bg-green-700 rounded-full transition"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Мобильное меню */}
                {menuOpen && (
                    <div className="md:hidden bg-[#1B4332] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-300">Главная</Link>
                        <Link href="/busket" onClick={() => setMenuOpen(false)} className="block text-white py-2 hover:text-green-300">Корзина</Link>
                    </div>
                )}
            </header>


            <main className="max-w-7xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6">Товары</h2>

                {/* Toast */}
                {toast && (
                    <div className="fixed z-50 bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
                        {toast}
                    </div>
                )}

                {/* Фильтры */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div>
                        <label className="mr-2 font-medium">Категория:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1);
                            }}
                            className="p-2 rounded border"
                        >
                            <option value="">Все</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            className="p-2 rounded border w-full md:w-64"
                        />
                    </div>
                </div>

                {/* Товары */}
                {loading ? (
                    <p>Загрузка товаров...</p>
                ) : products.length === 0 ? (
                    <p>Товары не найдены.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
                                <img
                                    src={product.image || '/placeholder.png'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                    <p className="text-green-600 font-bold mb-4">{product.price} ₸</p>
                                </div>
                                <button
                                    onClick={() => handleAdd(product)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                >
                                    В корзину
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
