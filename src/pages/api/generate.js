// pages/api/generate.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не поддерживается' });
    }

    try {
        // Данные о продукте, которые будут отправлены
        const productData = {
            name: "Удобрение Qunar",
            description: "Универсальное удобрение, подходящее для всех культур.",
            price: 200, // Цена за 1 кг
            packaging: ["1 кг", "3 кг", "10 кг"],
            advantages: ["Экологичность", "Высокая урожайность", "Доступная цена"]
        };

        // Прокси запрос на сервер API с добавлением данных о продукте
        const response = await fetch("https://vencera.tech/qunar/generate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...req.body, // Добавляем все данные, переданные с клиента
                product: productData, // Добавляем данные о продукте
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
