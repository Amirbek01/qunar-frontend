import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function AboutSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        'Тут должен быть вопрос?',
        'Тут должен быть вопрос?',
        'Тут должен быть вопрос?',
        'Тут должен быть вопрос?',
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white">
            <div className="px-6 py-10">
                <h2 className="text-3xl font-bold mb-6">О нас</h2>
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <div key={index} className="border-b pb-4">
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full flex justify-between items-center py-2 text-lg font-medium text-gray-700 hover:text-green-500 transition"
                            >
                                {question}
                                <FaChevronDown
                                    className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-green-500' : ''
                                        }`}
                                />
                            </button>
                            {activeIndex === index && (
                                <p className="text-gray-500 py-2 leading-6">
                                    Здесь будет ответ на вопрос. Информация о компании, миссии и других деталях.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
