import { useState } from 'react';
import { FaPaperPlane, FaImage } from 'react-icons/fa';

export default function AiSection() {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('📝 Текст запроса:', message);
        console.log('🖼 Загруженное изображение:', image);
        setMessage('');
        setImage(null);
    };

    return (
        <section className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
            style={{ backgroundImage: "url('/ai-section-bg.png')" }}>
            {/* Волнистая верхняя граница */}
            <div className="absolute top-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
                    <path d="M0.00,49.98 C150.00,150.00 349.89,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                        className="fill-white"></path>
                </svg>
            </div>

            {/* Градиентный логотип */}
            <h2 className="text-6xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                QUNAR.AI
            </h2>
            <p className="text-white text-lg mb-6">Всегда готов выручить вас!</p>

            {/* Форма */}
            <form onSubmit={handleSubmit}
                className="bg-white/90 rounded-full px-4 py-2 flex items-center w-full max-w-xl shadow-lg">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Чем могу быть полезен?"
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 px-4"
                />
                <button
                    type="submit"
                    className="text-white bg-green-500 hover:bg-green-600 rounded-full p-3 transition"
                >
                    <FaPaperPlane />
                </button>
            </form>

            {/* Загрузка изображения */}
            <label className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-green-600 transition">
                <FaImage />
                Анализ по фото
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {/* Волнистая нижняя граница */}
            {/* <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
                    <path d="M0.00,49.98 C150.00,150.00 349.89,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                        className="fill-white"></path>
                </svg>
            </div> */}
        </section>
    );
}
