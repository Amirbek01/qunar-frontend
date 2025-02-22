import Image from 'next/image';
import { FaLeaf } from 'react-icons/fa';
import { GiFarmTractor } from 'react-icons/gi';

export default function Sustainability() {
    return (
        <section className="relative bg-custom-dark text-white py-16">
            {/* Волнистая верхняя граница */}
            {/* <div className="absolute top-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
                    <path d="M0.00,49.98 C150.00,150.00 349.89,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                        className="fill-gray-50"></path>
                </svg>
            </div> */}

            <div className="max-w-7xl mx-auto px-6 pb-20 ">
                <h2 className="text-3xl font-bold text-center mb-12">Устойчивое развитие</h2>

                {/* Основной контент */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Левая колонка */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <FaLeaf className="text-green-400 text-3xl" />
                            <h3 className="text-xl font-semibold">Экологическая устойчивость</h3>
                        </div>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <strong>Снижение зависимости от химии – </strong>
                                уменьшает потребность в искусственных удобрениях и пестицидах, которые загрязняют воду и воздух.
                            </li>
                            <li>
                                <strong>Утилизация отходов – </strong>
                                перерабатывает пищевые и сельскохозяйственные отходы, превращая их в полезное удобрение.
                            </li>
                            <li>
                                <strong>Отсутствие токсичных элементов – </strong>
                                QUNAR не содержит вредных химических соединений и не накапливает тяжелые металлы.
                            </li>
                        </ul>
                    </div>

                    {/* Центр с логотипом */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                            src="/qunar-logo-circle.png"
                            alt="QUNAR Logo"
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                        <div className="bg-green-500 text-white text-lg font-bold px-8 py-2 rounded-full">
                            QUNAR
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <GiFarmTractor className="text-green-400 text-3xl" />
                            <h3 className="text-xl font-semibold">Поддержка местных фермеров</h3>
                        </div>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <strong>Доступное и натуральное удобрение – </strong>
                                QUNAR сделан из биоотходов. Местное производство снижает зависимость от дорогих импортных удобрений.
                            </li>
                            <li>
                                <strong>Создание рабочих мест – </strong>
                                производство QUNAR может стать дополнительным или основным источником дохода для сельских жителей.
                            </li>
                            <li>
                                <strong>Развитие локальной экономики – </strong>
                                поддержка производства и использования QUNAR способствует развитию сельского хозяйства на местном уровне.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Волнистая нижняя граница */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
                    <path d="M0.00,49.98 C150.00,150.00 349.89,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                        className="fill-gray-50"></path>
                </svg>
            </div>
        </section>
    );
}
