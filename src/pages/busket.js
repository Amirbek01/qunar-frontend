import React, { useEffect, useState } from "react";
import { useBusketStore } from "@/store/useBusketStore";
import Link from "next/link";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Busket() {
    const { busket, updateQuantity, removeFromBusket } = useBusketStore();
    const [totalPrice, setTotalPrice] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setTotalPrice(
            busket.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
    }, [busket]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] bg-opacity-95 backdrop-blur-sm text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo + Home */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img
                            src="/QUNAR.AI.png"
                            alt="QUNAR.AI"
                            className="h-8 w-auto cursor-pointer"
                        />
                        <span className="text-xl font-extrabold">Главная</span>
                    </Link>
                    {/* Icons */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/busket" className="hover:text-green-200 transition">
                            <FaShoppingCart size={20} />
                        </Link>
                        <Link href="/login" className="hover:text-green-200 transition">
                            <FaUserCircle size={20} />
                        </Link>
                    </div>
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 hover:bg-green-700 rounded-full transition"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-[#196F3D] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>
                            Домой
                        </Link>
                        <Link href="/busket" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>
                            Корзина
                        </Link>
                        <Link href="/about" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>
                            О нас
                        </Link>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className="pt-32 pb-8 px-4 flex-grow max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-gray-800">Ваша корзина</h1>
                <p className="text-gray-600 mb-6">
                    У вас в корзине <span className="font-semibold">{busket.length}</span> товаров
                </p>

                {!busket.length ? (
                    <div className="flex flex-col items-center mt-20">
                        <p className="text-xl text-gray-600 mb-4">Корзина пуста</p>
                        <Link
                            href="/"
                            className="bg-[#52AA5C] text-white py-2 px-6 rounded-full hover:bg-[#469A54] transition"
                        >
                            Вернуться к покупкам
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Items */}
                        <div className="md:w-2/3 space-y-4">
                            {busket.map(item => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div className="flex-1 ml-4">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {item.name}
                                        </h2>
                                        <p className="text-gray-500 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-800">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 border rounded hover:bg-gray-100 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold text-gray-800">
                                        {item.price * item.quantity} ₸
                                    </span>
                                    <button
                                        onClick={() => removeFromBusket(item.id)}
                                        className="text-red-500 text-xl ml-2 hover:text-red-600 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Общая сумма
                            </h2>
                            <div className="space-y-2 mb-4">
                                {busket.map(item => (
                                    <p
                                        key={item.id}
                                        className="flex justify-between text-gray-700 text-sm"
                                    >
                                        {item.name} x{item.quantity}
                                        <span>{item.price * item.quantity} ₸</span>
                                    </p>
                                ))}
                            </div>
                            <hr />
                            <h3 className="text-2xl font-bold text-gray-800 mt-4">
                                К оплате: {totalPrice} ₸
                            </h3>
                            <button className="mt-6 w-full bg-[#52AA5C] text-white py-2 rounded-lg hover:bg-[#469A54] transition">
                                Перейти к оплате
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
