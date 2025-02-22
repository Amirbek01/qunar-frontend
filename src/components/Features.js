import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function Features() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Особенности <span className="text-green-500">QUNAR</span>
                </h2>

                {/* 🔥 Блок 1 (Картинка справа) */}
                <div className="flex flex-col-reverse md:flex-row items-center bg-custom-dark rounded-lg p-8 mb-16 gap-8">
                    <div className="text-white md:w-1/2 space-y-4">
                        <p>
                            Мы внедряем искусственный интеллект для повышения удобства и
                            эффективности использования нашего продукта.
                        </p>
                        <div className="bg-green-500 text-white inline-block px-6 py-2 rounded-full text-sm font-semibold">
                            QUNAR.AI
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/ai-feature.png"
                            alt="AI Feature"
                            width={350}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* 🔍 Блок 2 (Картинка слева) */}
                <div className="flex flex-col md:flex-row items-center bg-custom-dark rounded-lg p-8 mb-16 gap-8">
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/analysis-feature.png"
                            alt="Analysis Feature"
                            width={350}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="text-white md:w-1/2 space-y-4">
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Анализ растений по фотографиям</li>
                            <li>Рекомендации по применению удобрения</li>
                            <li>Обучение пользователей</li>
                        </ul>
                        <div className="bg-green-500 text-white inline-block px-6 py-2 rounded-full text-sm font-semibold">
                            ЧТО УМЕЕТ QUNAR.AI
                        </div>
                    </div>
                </div>

                {/* 🌱 Блок 3 (Картинка справа) */}
                <div className="flex flex-col-reverse md:flex-row items-center bg-custom-dark rounded-lg p-8 gap-8">
                    <div className="text-white md:w-1/2 space-y-4">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Улучшает структуру почвы
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Обеспечивает растения питательными веществами
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Защищает от болезней
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Ускоряет рост
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheck className="text-green-500" />
                                Повышает урожайность
                            </li>
                        </ul>
                        <div className="bg-green-500 text-white inline-block px-6 py-2 rounded-full text-sm font-semibold">
                            QUNAR В ДЕЙСТВИИ
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/organic-feature.png"
                            alt="Organic Feature"
                            width={350}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
