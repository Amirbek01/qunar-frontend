import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

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
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo и Главная */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="/QUNAR.AI.png" alt="QUNAR.AI" className="h-8 w-auto" />
                        <span className="text-xl font-extrabold">Главная</span>
                    </Link>
                    {/* Иконки */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/busket" className="hover:text-green-200 transition">
                            <FaShoppingCart size={20} />
                        </Link>
                        <Link href="/login" className="hover:text-green-200 transition">
                            <FaUserCircle size={20} />
                        </Link>
                    </div>
                    {/* Mobile menu button */}
                    <button className="md:hidden p-2 hover:bg-green-700 rounded-full transition" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-[#196F3D] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>
                            Домой
                        </Link>
                        <Link href="/about" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>
                            О нас
                        </Link>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className="flex flex-col pt-32 pb-8 px-4 flex-grow max-w-7xl mx-auto">
                {/* О проекте */}
                <section className="mb-12">
                    <h2 className="flex items-center text-3xl font-semibold mb-4 text-gray-800">
                        <span className="text-green-600 text-2xl mr-2">🍃</span>О ПРОЕКТЕ
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Qunar — это экологичный стартап, создающий инновационные решения для садоводов и фермеров, сочетая натуральные продукты, цифровые технологии и образовательные ресурсы.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Натуральные удобрения и экологичные решения для устойчивого земледелия.</li>
                        <li>Обучение, инновации и забота об окружающей среде в одном продукте.</li>
                        <li>Поддержка местных фермеров через партнёрские программы и модули обучения.</li>
                    </ul>
                </section>

                {/* Наша команда */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Наша команда</h2>
                    <div className="relative">
                        <div className="flex justify-center gap-6">
                            {current.map(m => (
                                <div key={m.name} className="bg-white p-6 rounded-lg shadow text-center">
                                    <img src={m.img} alt={m.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800">{m.name}</h3>
                                    <p className="text-gray-600">{m.role}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-800 hover:text-green-600">◀</button>
                        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-800 hover:text-green-600">▶</button>
                        <div className="flex justify-center mt-4 space-x-2">
                            {Array(pageCount).fill().map((_, i) => (
                                <span
                                    key={i}
                                    onClick={() => setPage(i)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${i === page ? 'bg-green-600' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Партнёры */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Партнёры и поддержка</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-700">
                            Мы состоим в организации <strong>Enactus IITU</strong> и сотрудничаем с <strong>Университетом МУИТ</strong> для развития и поддержки.
                        </p>
                    </div>
                </section>

                {/* Контакты */}
                <section>
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Контакты</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-700 mb-2">
                            Свяжитесь с нами: <a href="mailto:contact@qunar.ai" className="text-green-600">contact@qunar.ai</a>
                        </p>
                        <p className="text-gray-700">Рады вашим вопросам и предложениям!</p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
