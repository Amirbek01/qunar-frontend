import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutUs() {
    const teamMembers = [
        { name: "Марглан", role: "Фаундер", img: "/images/team-founder.jpg" },
        { name: "Айдана", role: "СEО", img: "/images/team-ctoa.jpg" },
        { name: "Амирбек", role: "СТО", img: "/images/team-ctob.jpg" },
        { name: "Аян", role: "Дизайнер", img: "/images/team-designer-a.jpg" },
        { name: "Ираада", role: "Дизайнер", img: "/images/team-designer-b.jpg" },
        { name: "Жанболат", role: "Разработчик", img: "/images/team-developer.jpg" },
    ];
    const itemsPerPage = 3;
    const pageCount = Math.ceil(teamMembers.length / itemsPerPage);
    const [page, setPage] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const handlePrev = () => setPage((page - 1 + pageCount) % pageCount);
    const handleNext = () => setPage((page + 1) % pageCount);
    const start = page * itemsPerPage;
    const current = teamMembers.slice(start, start + itemsPerPage);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Header */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/qunar-logo-circle.png" alt="QUNAR.AI" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold">QUNAR</span>
                    </Link>
                    <nav className="hidden md:flex gap-8 font-semibold">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/product" className="hover:text-green-300 transition">Маркетплейс</Link>
                        <Link href="/subscriptions" className="hover:text-green-300 transition">Подписка</Link>
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

            <main className="flex flex-col pt-32 pb-8 px-4 flex-grow max-w-7xl mx-auto">
                {/* О проекте */}
                <motion.section className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h2 className="flex items-center text-3xl font-semibold mb-4 text-gray-800">
                        <span className="text-green-600 text-2xl mr-2">🍀</span>О ПРОЕКТЕ
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Qunar — это экологичный стартап, создающий инновационные решения для садоводов и фермеров.
                    </p>
                    <ul className="list-none text-gray-600 space-y-3">
                        <li className="flex items-center"><span className="text-green-500 mr-2">🌱</span>Натуральные удобрения и устойчивое земледелие.</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">📚</span>Обучение, инновации и забота об экологии.</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">🤝</span>Поддержка местных фермеров и партнёрство.</li>
                    </ul>
                </motion.section>

                {/* Наша команда */}
                <motion.section className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Наша команда</h2>
                    <div className="relative">
                        <div className="flex justify-center gap-8 flex-wrap">
                            {current.map(m => (
                                <motion.div key={m.name} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-lg text-center transition">
                                    {/* <img src={m.img} alt={m.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" /> */}
                                    <h3 className="text-xl font-bold text-gray-800">{m.name}</h3>
                                    <p className="text-gray-600">{m.role}</p>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button onClick={handlePrev} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">◀</button>
                            <button onClick={handleNext} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">▶</button>
                        </div>
                    </div>
                </motion.section>

                {/* Партнёры */}
                <motion.section className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Партнёры и поддержка</h2>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-gray-700">
                            Мы часть <strong>Enactus IITU</strong> и сотрудничаем с <strong>Университетом МУИТ</strong> для развития нашего проекта.
                        </p>
                    </div>
                </motion.section>

                {/* Контакты */}
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Контакты</h2>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-gray-700 mb-2">
                            Свяжитесь с нами: <a href="mailto:contact@qunar.ai" className="text-green-600 hover:underline">contact@qunar.ai</a>
                        </p>
                        <p className="text-gray-700">Мы всегда рады вашим вопросам и предложениям!</p>
                    </div>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
