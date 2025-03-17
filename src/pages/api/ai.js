export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Только POST-запросы!" });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Введите текст запроса!" });
    }

    try {
        const response = await fetch("http://176.123.178.135/9090/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера!" });
    }
}
