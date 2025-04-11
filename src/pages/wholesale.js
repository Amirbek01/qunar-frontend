import Link from 'next/link';

export default function Wholesale() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800">
            {/* Фиксированная шапка */}
            <header className="bg-green-600 text-white py-4 fixed w-full top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        QUNAR.AI
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="hover:underline">
                            Домой
                        </Link>
                        <Link href="/products" className="hover:underline">
                            Продукты
                        </Link>
                        <Link href="/about" className="hover:underline">
                            О нас
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            Контакты
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Основной контент */}
            <main className="pt-20 max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-center mb-6">Оптовые заказы</h1>
                <p className="text-lg text-center mb-10">
                    Мы предлагаем выгодные условия для оптовых покупателей. Если вы хотите приобрести нашу продукцию для бизнеса или больших ферм, заполните форму ниже, и наш менеджер свяжется с вами.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Ваше имя
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Введите ваше имя"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Введите вашу почту"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                Телефон
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Введите ваш телефон"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 mb-2">
                                Сообщение
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Ваше сообщение"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                            onClick={() => alert("Скоро можно будет заказывать")}
                        >
                            Отправить запрос
                        </button>
                    </form>
                </div>

                {/* Кнопка возврата */}
                <div className="text-center mt-10">
                    <Link href="/products">
                        <button className="bg-green-500 text-white px-10 py-3 rounded-full text-lg hover:bg-green-600 transition">
                            Вернуться к покупкам
                        </button>
                    </Link>
                </div>
            </main>

            {/* Футер */}
            <footer className="bg-green-600 text-white py-4 text-center mt-10">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
