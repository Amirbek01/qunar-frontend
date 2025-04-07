import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800">
            {/* Фиксированная шапка */}
            <header className="bg-green-600 text-white py-4 fixed w-full top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" legacyBehavior>
                        <a className="text-2xl font-bold">QUNAR.AI</a>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" legacyBehavior>
                            <a className="hover:underline">Домой</a>
                        </Link>
                        <Link href="/products" legacyBehavior>
                            <a className="hover:underline">Продукты</a>
                        </Link>
                        <Link href="/about" legacyBehavior>
                            <a className="hover:underline">О нас</a>
                        </Link>
                        <Link href="/contact" legacyBehavior>
                            <a className="hover:underline">Контакты</a>
                        </Link>
                    </nav>
                </div>
            </header>


            <main className="pt-20 max-w-7xl mx-auto px-6">
                {/* Блок "О нас" */}
                <section className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">О нас</h1>
                    <p className="text-lg">
                        QUNAR.AI — инновационный проект, который развивает растения с помощью уникального удобрения и искусственного интеллекта.
                    </p>
                </section>

                {/* Команда */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Наша команда</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Фаундер */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-founder.jpg" alt="Марглан" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Марглан</h3>
                            <p className="text-center text-gray-600">Фаундер</p>
                        </div>
                        {/* СТО */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-ctoa.jpg" alt="Айдана" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Айдана</h3>
                            <p className="text-center text-gray-600">СТО</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-ctob.jpg" alt="Амирбек" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Амирбек</h3>
                            <p className="text-center text-gray-600">СТО</p>
                        </div>
                        {/* Дизайнеры */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-designer-a.jpg" alt="Аян" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Аян</h3>
                            <p className="text-center text-gray-600">Дизайнер</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-designer-b.jpg" alt="Рада" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Рада</h3>
                            <p className="text-center text-gray-600">Дизайнер</p>
                        </div>
                        {/* Разработчик */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <img src="/images/team-developer.jpg" alt="Жан Болат" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-center">Жан Болат</h3>
                            <p className="text-center text-gray-600">Разработчик</p>
                        </div>
                    </div>
                </section>

                {/* О проекте */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">О проекте</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="mb-4">
                            Наш проект посвящён созданию инновационного удобрения, которое помогает растениям расти и развиваться. Оно производится по уникальной технологии:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>
                                Используется коровий навоз, внутрь которого помещают специального червя.
                            </li>
                            <li>
                                Через 5 месяцев процесс превращает навоз в высококачественное удобрение.
                            </li>
                            <li>
                                На сайте внедрён искусственный интеллект, отвечающий на вопросы по уходу за растениями.
                            </li>
                        </ul>
                        <p>
                            Проект активно развивается, достигаются новые этапы, внедряются инновации для улучшения агротехнологий.
                        </p>
                    </div>
                </section>

                {/* Партнёры */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Партнёры и поддержка</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="mb-2">
                            Мы состоим в организации <strong>Enactus AI2</strong> и сотрудничаем с <strong>Университетом Муид</strong>, что обеспечивает нам поддержку и возможности для дальнейшего развития.
                        </p>
                    </div>
                </section>

                {/* Контакты */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Контакты</h2>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="mb-2">
                            Для связи используйте форму на сайте или пишите на:{" "}
                            <a href="mailto:contact@qunar.ai" className="text-blue-500">
                                contact@qunar.ai
                            </a>
                        </p>
                        <p>Мы всегда рады вашим вопросам!</p>
                    </div>
                </section>
            </main>

            <footer className="bg-green-600 text-white py-4 text-center">
                &copy; {new Date().getFullYear()} QUNAR.AI. Все права защищены.
            </footer>
        </div>
    );
}
