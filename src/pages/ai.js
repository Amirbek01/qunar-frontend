import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaPaperPlane,
  FaCamera,
} from "react-icons/fa";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const chatRef = useRef(null);


  const navItems = [
    { href: "/", label: "Домой" },
  ];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    if (messages.length) setShowIntro(false);
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response || 'Ошибка в ответе.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Ошибка при отправке запроса.' }]);
    }
    setInput('');
    setLoading(false);
  };

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMsg = msg => {
    const bubbleClasses =
      msg.role === 'user'
        ? 'self-end bg-gradient-to-r from-[#52AA5C] to-[#3F8C4A] text-white rounded-xl rounded-br-none shadow-lg'
        : 'self-start bg-white text-[#444444] rounded-xl rounded-bl-none shadow';
    const tailClasses =
      msg.role === 'user'
        ? 'right-0 translate-x-1/2 rounded-tl-lg'
        : 'left-0 -translate-x-1/2 rounded-tr-lg';

    return (
      <div className={`max-w-[70%] px-4 py-3 mb-4 relative break-words ${bubbleClasses}`}>
        <ReactMarkdown components={{ p: ({ children }) => <p className="my-0">{children}</p> }}>
          {msg.text}
        </ReactMarkdown>
        <span className={`absolute w-3 h-3 bg-inherit bottom-0 ${tailClasses}`} />
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white shadow-lg z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/qunar-logo-circle.png" alt="QUNAR.AI" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold">QUNAR</span>
                    </Link>
                    <nav className="hidden md:flex gap-8 font-semibold">
                        <Link href="/" className="hover:text-green-300 transition">Главная</Link>
                        <Link href="/product" className="hover:text-green-300 transition">Qunar Маркет</Link>
                        <Link href="/about" className="hover:text-green-300 transition">О нас</Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/busket" className="hover:text-green-300 transition">
                            <FaShoppingCart size={24} />
                        </Link>
                        <Link href="/account" className="hover:text-green-300 transition">
                            <FaUserCircle size={24} />
                        </Link>
                    </div>
                    <button className="md:hidden p-2 hover:bg-green-700 rounded-full transition" onClick={() => setMenuOpen(prev => !prev)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-[#196F3D] bg-opacity-95 backdrop-blur-sm px-6 py-4 space-y-3">
                        <Link href="/" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Главная</Link>
                        <Link href="/product" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Маркетплейс</Link>
                        <Link href="/about" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <Link href="/subscriptions" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Подписка</Link>
                        <Link href="/busket" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Корзина</Link>
                        <Link href="/account" className="block text-white py-2 hover:text-green-200 transition" onClick={() => setMenuOpen(false)}>Аккаунт</Link>
                    </div>
                )}
            </header>

      <main className="flex flex-col items-center pt-32 pb-8 px-4 flex-grow bg-white">
        {showIntro && (
          <div className="relative w-full max-w-2xl flex flex-col items-center mt-10">
            <img src="/QUNAR.AI.png" alt="QUNAR.AI" className="w-48 opacity-20" />
            <h1 className="text-lg text-[#444444] mt-4">Это начало вашей консультации с</h1>
            <h2 className="text-2xl font-bold text-[#52AA5C]">QUNAR.AI</h2>
          </div>
        )}

        {messages.length > 0 && (
          <div
            ref={chatRef}
            className="flex flex-col w-full max-w-2xl bg-white rounded-2xl p-6 mt-6 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#52AA5C] scrollbar-track-white"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className="flex"
                style={{ flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
              >
                {renderMsg(m)}
              </div>
            ))}
            {loading && <div className="self-start text-[#AAAAAA] italic">ИИ печатает...</div>}
          </div>
        )}

        <div className="flex w-full max-w-2xl mt-4 items-center">
          <div className="flex items-center bg-white px-4 py-3 border border-[#DDD] rounded-full flex-1 shadow-sm">
            <input
              type="text"
              className="flex-1 outline-none"
              placeholder="Чем могу быть полезен?"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <button
            onClick={sendMessage}
            className="ml-4 bg-[#52AA5C] hover:bg-[#469A54] p-3 rounded-full transition shadow-lg"
          >
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </main>
    </div>
  );
}
