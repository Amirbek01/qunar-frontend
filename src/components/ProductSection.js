import Image from 'next/image';
import { useState } from 'react';

export default function ProductSection() {
    const [products] = useState([
        {
            id: 1,
            weight: '1 КГ',
            description: 'Рекомендовано для домашних растений',
            image: '/product.png',
        },
        {
            id: 2,
            weight: '5 КГ',
            description: 'Рекомендовано для садовников',
            image: '/product.png',
        },
        {
            id: 3,
            weight: '20 КГ',
            description: 'Рекомендовано для оптовой закупки или больших ферм',
            image: '/product.png',
        },
    ]);

    const handleAddToCart = (product) => {
        console.log('🛒 Товар добавлен в корзину:', product);
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Ассортимент</h2>

                {/* Карточки товаров без скролла */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center"
                        >
                            <Image
                                src={product.image}
                                alt={product.weight}
                                width={150}
                                height={150}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-semibold">{product.weight}</h3>
                            <p className="text-gray-600 text-sm text-center mb-4">{product.description}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                            >
                                ДОБАВИТЬ В КОРЗИНУ
                            </button>
                        </div>
                    ))}
                </div>

                {/* Кнопка для перехода в корзину */}
                <div className="text-center mt-10">
                    <button className="bg-green-500 text-white px-10 py-3 rounded-full text-lg hover:bg-green-600 transition">
                        ПЕРЕЙТИ К КОРЗИНЕ
                    </button>
                </div>
            </div>
        </section>
    );
}
