import { useEffect, useState } from "react";
import { useBusketStore } from "@/store/useBusketStore";
import Link from "next/link";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Busket() {
    const { busket, updateQuantity, removeFromBusket } = useBusketStore();
    const [totalPrice, setTotalPrice] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setTotalPrice(busket.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [busket]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-white">
            {/* Шапка */}
            <header className="bg-green-600 text-white py-4 fixed w-full top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/">
                        <span className="text-2xl font-bold cursor-pointer">QUNAR.AI</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/">Домой</Link>
                        <Link href="/products">Продукты</Link>
                        <Link href="/sustainability">Устойчивость</Link>
                        <Link href="/about">О нас</Link>
                    </nav>
                    <div className="hidden md:flex gap-4">
                        <Link href="/busket">
                            <FaShoppingCart className="text-2xl hover:text-green-200" />
                        </Link>
                        <Link href="/login">
                            <FaUserCircle className="text-2xl hover:text-green-200" />
                        </Link>
                    </div>
                    {/* Гамбургер для мобильных */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {/* Мобильное меню */}
                {menuOpen && (
                    <div className="md:hidden bg-green-700 px-6 py-4">
                        <Link href="/" className="block py-1" onClick={() => setMenuOpen(false)}>Домой</Link>
                        <Link href="/products" className="block py-1" onClick={() => setMenuOpen(false)}>Продукты</Link>
                        <Link href="/sustainability" className="block py-1" onClick={() => setMenuOpen(false)}>Устойчивость</Link>
                        <Link href="/about" className="block py-1" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <div className="flex gap-4 pt-2">
                            <Link href="/busket" onClick={() => setMenuOpen(false)}>
                                <FaShoppingCart className="text-2xl hover:text-green-200" />
                            </Link>
                            <Link href="/login" onClick={() => setMenuOpen(false)}>
                                <FaUserCircle className="text-2xl hover:text-green-200" />
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Основная часть */}
            <main className="pt-20 px-6 flex-grow max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold">Ваша корзина</h1>
                <p className="text-gray-600">У вас в корзине {busket.length} товаров</p>

                {busket.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-10">
                        {/* Замените путь на подходящую картинку */}
                        {/* <img src="/images/empty-cart.svg" alt="Empty Cart" className="w-40 h-40 mb-4" /> */}
                        <p className="text-xl text-gray-600">Корзина пуста</p>
                        <Link href="/#products" className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Вернуться к покупкам
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col md:flex-row gap-10">
                        {/* Список товаров */}
                        <div className="md:w-2/3">
                            {busket.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-4 bg-white">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                    <div className="flex-1 ml-4">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-500">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 border hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 border hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="font-bold">{item.price * item.quantity} ₸</span>
                                    <button onClick={() => removeFromBusket(item.id)} className="text-red-500 text-xl ml-2">
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Блок оплаты */}
                        <div className="md:w-1/3 p-6 border rounded-lg shadow-md bg-gray-50">
                            <h2 className="text-xl font-semibold mb-2">Общая сумма</h2>
                            <div className="border-t pt-2">
                                {busket.map((item) => (
                                    <p key={item.id} className="text-gray-600 flex justify-between">
                                        {item.name} x{item.quantity}
                                        <span>{item.price * item.quantity} ₸</span>
                                    </p>
                                ))}
                            </div>
                            <hr className="my-2" />
                            <h3 className="text-xl font-bold">К оплате: {totalPrice} ₸</h3>
                            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                                Перейти к оплате
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
