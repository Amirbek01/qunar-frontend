export default function AboutSectionScreens() {
    return (
        <section className="bg-gray-100 text-gray-900 py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">О компании QUNAR</h2>
                <p className="text-lg max-w-3xl mx-auto">
                    Мы в QUNAR создаем инновационные решения для повышения урожайности и заботы о земле.
                    Наши технологии искусственного интеллекта помогают фермерам и садоводам по всему миру.
                </p>
            </div>

            <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h3 className="text-2xl font-semibold mb-3">Наша миссия</h3>
                    <p>Мы стремимся сделать сельское хозяйство более экологичным, продуктивным и доступным.</p>
                </div>
                
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h3 className="text-2xl font-semibold mb-3">Наши ценности</h3>
                    <p>Экологичность, инновации, поддержка фермеров и забота о природе.</p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold">Свяжитесь с нами</h3>
                <p>Email: example@email.com</p>
                <p>Телефон: +7 777 777 7777</p>
            </div>
        </section>
    );
}
