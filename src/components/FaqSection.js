import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const qa = [
        {
            question: 'Что такое QUNAR и чем он отличается?',
            answer: 'QUNAR — это биоудобрение, созданное из переработанных органических отходов. Оно безопасно для окружающей среды и эффективно для любых растений.',
        },
        {
            question: 'Какая миссия у вашего проекта?',
            answer: 'Наша миссия — сделать экологическое земледелие доступным каждому и сократить вред от химических удобрений через устойчивые решения.',
        },
        {
            question: 'Из каких материалов сделан продукт?',
            answer: 'В состав QUNAR входят переработанные биоотходы: растительные остатки, пищевые отходы и другие органические компоненты без токсинов.',
        },
        {
            question: 'Где производится QUNAR?',
            answer: 'Производство осуществляется в Казахстане с акцентом на поддержку местных фермеров и развитие локальной экономики.',
        },
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Левая колонка — FAQ */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">FAQ</h2>
                    <p className="text-gray-600 mb-6 leading-6">
                        Имеются вопросы? Есть пожелания? Тут вы найдете ответы на все актуальные вопросы.
                        <br />
                        Если вы всё же не нашли чего искали — обратитесь в поддержку и свяжитесь с нами!
                    </p>
                    <button
                        onClick={() => window.open('https://t.me/BeketMargulan', '_blank')}
                        className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
                    >
                        Служба поддержки
                    </button>
                </div>

                {/* Правая колонка — О нас */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">О нас</h2>
                    <div className="space-y-4">
                        {qa.map((item, index) => (
                            <div key={index} className="border-b pb-4">
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full flex justify-between items-center py-2 text-lg font-medium text-gray-700 hover:text-green-500 transition"
                                >
                                    {item.question}
                                    <FaChevronDown
                                        className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-green-500' : ''
                                            }`}
                                    />
                                </button>
                                {activeIndex === index && (
                                    <p className="text-gray-500 py-2 leading-6">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
