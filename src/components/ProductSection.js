import Image from 'next/image';
import { useBusketStore } from '../store/useBusketStore';
import Link from 'next/link';

export default function ProductSection() {
    const { addToBusket } = useBusketStore();

    const products = [
        {
            id: 1,
            weight: '1 КГ',
            description: 'Рекомендовано для домашних растений',
            image: '/1744341785091.png',
            price: 1000,
        },
        {
            id: 2,
            weight: '5 КГ',
            description: 'Рекомендовано для садовников',
            image: '/1744341962585.png',
            price: 4500,
        },
        {
            id: 3,
            weight: '10 КГ',
            description: 'Рекомендовано для оптовой закупки или больших ферм',
            image: '/1744341806073.png',
            price: 15000,
        },
    ];

    return (
        <section className="bg-gray-50 py-16" id="products">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Ассортимент</h2>

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
                            <p className="text-gray-600 text-sm text-center mb-2">{product.description}</p>
                            <p className="text-lg font-bold text-gray-800 mb-4">{product.price} ₸</p>
                            <button
                                onClick={() => addToBusket(product)}
                                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                            >
                                ДОБАВИТЬ В КОРЗИНУ
                            </button>
                        </div>
                    ))}
                </div>

                {/* Блок для оптовых покупателей */}
                <div className="text-center mt-10">
                    <p className="text-gray-700 text-lg mb-4">Оптовые покупки для больших ферм и бизнеса</p>
                    <Link href="/wholesale">
                        <button className="bg-green-500 text-white px-10 py-3 rounded-full text-lg hover:bg-blue-600 transition">
                            Оптовый заказ
                        </button>
                    </Link>
                </div>

                {/* Кнопка для перехода в корзину */}
                <div className="text-center mt-6">
                    <Link href="/busket">
                        <button className="bg-green-500 text-white px-10 py-3 rounded-full text-lg hover:bg-green-600 transition">
                            ПЕРЕЙТИ К КОРЗИНЕ
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
