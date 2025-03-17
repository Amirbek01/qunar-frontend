import { useEffect, useState } from "react";
import { useBusketStore } from "@/store/useBusketStore"; // Zustand store для корзины
import Link from "next/link";

export default function Busket() {
    const { busket, updateQuantity, removeFromBusket } = useBusketStore();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Рассчитать итоговую сумму
        const total = busket.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [busket]);

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <h1 className="text-3xl font-bold">Ваша корзина</h1>
            <p className="text-gray-600">У вас в корзине {busket.length} товаров</p>

            <div className="mt-6 flex gap-10">
                {/* Список товаров */}
                <div className="w-2/3">
                    {busket.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        busket.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm mb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16" />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-gray-500">{item.description}</p>
                                </div>

                                {/* Количество */}
                                <div className="flex items-center gap-2">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 border">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 border">+</button>
                                </div>

                                {/* Цена */}
                                <span className="font-bold">{item.price * item.quantity} ₸</span>

                                {/* Удалить */}
                                <button onClick={() => removeFromBusket(item.id)} className="text-red-500">✖</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Блок оплаты */}
                {busket.length > 0 && (
                    <div className="w-1/3 p-6 border rounded-lg shadow-md bg-gray-100">
                        <h2 className="text-xl font-semibold">Общая сумма</h2>
                        <div className="border-t mt-2 pt-2">
                            {busket.map((item) => (
                                <p key={item.id} className="text-gray-600">
                                    {item.name} x{item.quantity} <span className="float-right">{item.price * item.quantity} ₸</span>
                                </p>
                            ))}
                        </div>
                        <hr className="my-2" />
                        <h3 className="text-xl font-bold">К оплате: {totalPrice} ₸</h3>
                        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg">Перейти к оплате</button>
                    </div>
                )}
            </div>

            {/* Кнопка назад */}
            <Link href="/#products" className="text-blue-500 mt-4 inline-block">Вернуться к покупкам</Link>
        </div>
    );
}
