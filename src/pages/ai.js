import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function AIChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // для гамбургера

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (messages.length > 0) setShowIntro(false);
    }, [messages]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);
        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),
            });

            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            const aiMessage = data?.response
                ? { role: "ai", text: data.response }
                : { role: "ai", text: "Ошибка в ответе сервера." };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "ai", text: "Ошибка при отправке запроса." },
            ]);
        }
        setInput("");
        setLoading(false);
    };

    const renderMessage = (msg) => {
        if (msg.role === "user") {
            return <div className="text-white">{msg.text}</div>;
        }
        return (
            <div className="markdown-content text-gray-800">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                        p: ({ node, ...props }) => <p className="my-1" {...props} />,
                        code: ({ node, inline, ...props }) =>
                            inline ? (
                                <code className="bg-gray-100 px-1 rounded text-red-600" {...props} />
                            ) : (
                                <code className="block bg-gray-100 p-2 rounded my-2 overflow-x-auto text-sm" {...props} />
                            ),
                    }}
                >
                    {msg.text}
                </ReactMarkdown>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-white">
            {/* Шапка */}
            <header className="bg-green-600 text-white py-4 fixed w-full top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/">
                        <span className="text-2xl font-bold cursor-pointer">QUNAR.AI</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/">Домой</Link>
                        <Link href="/products">Продукты</Link>
                        <Link href="/sustainability">Устойчивость</Link>
                        <Link href="/about">О нас</Link>
                    </nav>
                    <div className="hidden md:flex gap-4">
                        <Link href="/busket">
                            <FaShoppingCart className="text-2xl cursor-pointer hover:text-green-200" />
                        </Link>
                        <Link href="/login">
                            <FaUserCircle className="text-2xl hover:text-green-200" />
                        </Link>
                    </div>
                    {/* Гамбургер для мобильных */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {/* Мобильное меню */}
                {menuOpen && (
                    <div className="md:hidden bg-green-700 px-6 py-4">
                        <Link href="/" className="block py-1" onClick={() => setMenuOpen(false)}>Домой</Link>
                        <Link href="/products" className="block py-1" onClick={() => setMenuOpen(false)}>Продукты</Link>
                        <Link href="/sustainability" className="block py-1" onClick={() => setMenuOpen(false)}>Устойчивость</Link>
                        <Link href="/about" className="block py-1" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <div className="flex gap-4 pt-2">
                            <Link href="/busket" onClick={() => setMenuOpen(false)}>
                                <FaShoppingCart className="text-2xl hover:text-green-200" />
                            </Link>
                            <Link href="/login" onClick={() => setMenuOpen(false)}>
                                <FaUserCircle className="text-2xl hover:text-green-200" />
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Основной блок (чат) */}
            <section className="flex-grow pt-20 flex flex-col items-center px-4">
                {showIntro && (
                    <div className="text-center my-6">
                        <h1 className="text-gray-600 text-lg">Это начало вашей консультации с</h1>
                        <h2 className="text-gray-800 text-2xl font-semibold">QUNAR.AI</h2>
                    </div>
                )}

                <div
                    ref={chatContainerRef}
                    className="w-full max-w-2xl flex-grow bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto"
                >
                    {messages.length === 0 ? (
                        <p className="text-gray-400 text-center">Здесь появятся ваши сообщения...</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 p-3 rounded-lg ${msg.role === "user" ? "bg-green-500 text-white ml-auto w-fit" : "bg-gray-200 mr-auto w-fit"
                                    }`}
                            >
                                {renderMessage(msg)}
                            </div>
                        ))
                    )}
                    {loading && <p className="text-gray-400 text-center">ИИ печатает...</p>}
                </div>

                <div className="w-full max-w-2xl flex">
                    <input
                        type="text"
                        className="flex-1 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Чем могу быть полезен?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="px-6 py-3 rounded-r-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        ▶️
                    </button>
                </div>
            </section>
        </div>
    );
}
