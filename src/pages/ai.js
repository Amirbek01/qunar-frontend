import { useState } from "react";

export default function AIChat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message) return;

        setLoading(true);
        setResponse("");

        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message }),
        });

        const data = await res.json();
        setResponse(data.response);
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold text-center">🤖 Чат с AI</h1>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="w-full p-3 border rounded-md mt-5"
            />

            <button
                onClick={sendMessage}
                className="w-full bg-green-500 text-white py-2 mt-3 rounded-md hover:bg-green-600"
                disabled={loading}
            >
                {loading ? "AI думает..." : "Отправить"}
            </button>

            {response && (
                <div className="mt-5 p-3 bg-gray-100 border rounded-md">
                    <strong>Ответ:</strong> {response}
                </div>
            )}
        </div>
    );
}
