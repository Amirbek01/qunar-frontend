import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";



export default function AIChat() {
    const [messages, setMessages] = useState([]);  // Список сообщений
    const [input, setInput] = useState("");         // Текстовое поле
    const [loading, setLoading] = useState(false);  // Индикатор загрузки

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const sendMessage = async () => {
        if (!input.trim()) {
            console.log("Пользователь не ввел текст.");
            return;
        }
        
        console.log("Отправка сообщения:", input);
        setLoading(true);
    
        // Добавляем сообщение пользователя в список
        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        
        try {
            console.log("Отправка запроса на сервер...");
            const response = await fetch("/api/generate", {  // Используем внутренний API роут
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: input }),
            });
    
            console.log("Ответ от сервера получен:", response);
    
            if (!response.ok) {
                console.error("Ошибка в ответе от сервера:", response.statusText);
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Данные из ответа:", data);
    
            if (data && data.response) {
                const aiMessage = { role: "ai", text: data.response };
                setMessages((prev) => [...prev, aiMessage]);
            } else {
                console.warn("Ответ не содержит 'response':", data);
                // Добавляем сообщение об ошибке в чат
                const errorMessage = { role: "ai", text: "Произошла ошибка при обработке ответа." };
                setMessages((prev) => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            // Добавляем сообщение об ошибке в чат
            const errorMessage = { role: "ai", text: "Извините, не удалось отправить запрос. Проверьте подключение." };
            setMessages((prev) => [...prev, errorMessage]);
        }
    
        setInput("");
        setLoading(false);

        const renderMessage = (msg) => {
            if (msg.role === "user") {
                return <div className="text-white">{msg.text}</div>;
            } else {
                return (
                    <ReactMarkdown
                        className="markdown-content text-gray-800"
                        components={{
                            // Настройка стилей для разных элементов markdown
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-md font-bold my-1" {...props} />,
                            p: ({node, ...props}) => <p className="my-1" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />,
                            code: ({node, inline, ...props}) => 
                                inline 
                                    ? <code className="bg-gray-100 px-1 rounded text-red-600" {...props} />
                                    : <code className="block bg-gray-100 p-2 rounded my-2 overflow-x-auto text-sm" {...props} />
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                );
            }
    
    };
    }

    return (
        <>
            {/* 🔹 Хедер */}
            <header className="bg-green-600 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    {/* Лого */}
                    <Link href="/">
                        <span className="text-2xl font-bold cursor-pointer">QUNAR.AI</span>
                    </Link>

                    {/* Навигация */}
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="hover:underline">Домой</Link>
                        <Link href="/products" className="hover:underline">Продукты</Link>
                        <Link href="/sustainability" className="hover:underline">Устойчивость</Link>
                        <Link href="/about" className="hover:underline">О нас</Link>
                    </nav>

                    {/* Иконки */}
                    <div className="flex gap-4">
                        <Link href="/busket">
                            🛒
                        </Link>
                        <Link href="/profile">
                            👤
                        </Link>
                    </div>
                </div>
            </header>

            {/* 🔹 Чат AI */}
            <section className="h-screen flex flex-col justify-center items-center bg-white">
                <div className="text-center mb-6">
                    <h1 className="text-gray-600 text-lg mt-2">Это начало вашей консультации с</h1>
                    <h2 className="text-gray-800 text-2xl font-semibold">QUNAR.AI</h2>
                </div>

                {/* Окно сообщений */}
                <div className="w-full max-w-3xl h-96 bg-gray-100 rounded-lg shadow-md overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <p className="text-gray-400 text-center">Здесь появятся ваши сообщения...</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 p-3 rounded-lg ${
                                    msg.role === "user" ? "bg-green-500 text-white self-end" : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))
                    )}
                    {loading && <p className="text-gray-400 text-center">ИИ печатает...</p>}
                </div>

                {/* Поле ввода */}
                <div className="mt-4 flex items-center w-full max-w-3xl">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none"
                        placeholder="Чем могу быть полезен?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 border rounded-r-lg bg-green-500 text-white hover:bg-green-600"
                    >
                        ▶️
                    </button>
                </div>
            </section>
        </>
    );
}
