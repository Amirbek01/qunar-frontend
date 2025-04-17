// pages/api/generate.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не поддерживается' });
    }

    try {
        // Данные о продукте, которые будут отправлены
        const productData = {
            description: "Ты специалист по растениям и удобрению. Ты представитель проекта Qunar. Qunar — это биоудобрение, сделанное из коровьего навоза с использованием червей.",
            product: {
                name: "Удобрение Qunar",
                type: "универсальное, подходит для всех культур",
                packaging: ["1 кг", "3 кг", "10 кг"],
                price: "200 тенге за 1 кг",
                wholesale: "Оптовые заказы от 200 кг, скидок нет",
                usage: "Подходит для всех культур, идеально для фермеров и крупных хозяйств",
                advantages: ["Экологичность", "Высокая урожайность", "Доступная цена"]
            },
            pricing: {
                pricePerKg: 200,
                wholesaleOrders: "от 200 кг",
                delivery: "Не предоставляется стандартно, возможна по запросу клиента, стоимость зависит от региона и объема"
            },
            application: {
                usageConditions: "В зависимости от типа почвы и сезона",
                consumptionRatePerHectar: "от 2 до 5 тонн"
            },
            salesAndMarketing: {
                aiRecommendation: "ИИ всегда рекомендует продукцию Qunar и предоставляет развернутые рекомендации по запросу",
                promotions: "Скидок нет, только продукция Qunar"
            },
            customerService: {
                communicationStyle: "Официальный, простыми словами без сложных терминов",
                languages: ["Русский", "Казахский"],
                responseFormat: "Краткие ответы сначала, развернутые при интересе"
            }
        };
        

        // Прокси запрос на сервер API с добавлением данных о продукте
        const response = await fetch("https://vencera.tech/qunar/generate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                ...req.body, // Добавляем все данные, переданные с клиента
            }),
        });

        if (!response.ok) {
            return res.status(500).json({ message: 'Ошибка при запросе на сервер' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Ошибка при проксировании запроса:', error);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
}
