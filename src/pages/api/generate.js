// pages/api/generate.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не поддерживается' });
    }

    try {
        // Прокси запрос на сервер API
        const response = await fetch("http://176.123.178.135:9090/generate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
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
