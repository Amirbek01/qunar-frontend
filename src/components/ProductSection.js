import Image from 'next/image';
import { useBusketStore } from '../store/useBusketStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductSection() {
    const { addToBusket } = useBusketStore();
    const [toast, setToast] = useState('');

    const products = [
        { id: 1, weight: '1 КГ', description: 'Рекомендовано для домашних растений', image: '/1744341785091.png', price: 1000 },
        { id: 2, weight: '5 КГ', description: 'Рекомендовано для садовников', image: '/1744341962585.png', price: 4500 },
        { id: 3, weight: '10 КГ', description: 'Рекомендовано для оптовой закупки или больших ферм', image: '/1744341806073.png', price: 15000 },
    ];

    const handleAdd = (product) => {
        addToBusket(product);
        setToast(`Добавлено: ${product.weight}`);
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <section className="bg-gray-50 py-16 relative" id="products">
            {/* Toast notification */}
            {toast && (
                <div className="fixed z-50 bottom-8 right-8 bg-[#52AA5C] text-white px-4 py-2 rounded shadow-lg animate-slide-in">
                    {toast}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Ассортимент</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between h-full"
                        >
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <Image src={product.image} alt={product.weight} width={150} height={150} />
                                </div>
                                <h3 className="text-xl font-semibold">{product.weight}</h3>
                                <p className="text-gray-600 text-sm text-center mb-2">{product.description}</p>
                                <p className="text-lg font-bold text-gray-800 mb-4">{product.price} ₸</p>
                            </div>

                            <button
                                onClick={() => handleAdd(product)}
                                className="bg-[#52AA5C] text-white px-6 py-2 rounded-full hover:bg-[#469A54] transition"
                            >
                                ДОБАВИТЬ В КОРЗИНУ
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link
                        href="/product"
                        className="bg-[#52AA5C] text-white px-8 py-3 rounded-full text-lg hover:bg-[#469A54] transition"
                    >
                        Маркетплейс
                    </Link>
                    <Link
                        href="/busket"
                        className="bg-[#52AA5C] text-white px-8 py-3 rounded-full text-lg hover:bg-[#469A54] transition"
                    >
                        В корзину
                    </Link>
                </div>
            </div>
        </section>
    );
}
