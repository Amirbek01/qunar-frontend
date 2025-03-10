import { useState, useEffect } from "react";
import api from "@/services/api"; // API-файл с axios
import { FaPlus } from "react-icons/fa";

export default function ChatSidebar({ activeChat, setActiveChat }) {
    const [chats, setChats] = useState([]);
    const [newChatTitle, setNewChatTitle] = useState("");

    // Загружаем список чатов при старте
    useEffect(() => {
        async function fetchChats() {
            try {
                const response = await api.get("/chats");
                setChats(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке чатов:", error);
            }
        }
        fetchChats();
    }, []);

    // Создание нового чата
    async function handleCreateChat() {
        if (!newChatTitle.trim()) return;
        try {
            const response = await api.post("/chats", { title: newChatTitle });
            setChats([...chats, response.data]);
            setNewChatTitle(""); // Очищаем поле
        } catch (error) {
            console.error("Ошибка при создании чата:", error);
        }
    }

    return (
        <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-4">QUNAR.AI</h2>

            {/* Поле для создания нового чата */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newChatTitle}
                    onChange={(e) => setNewChatTitle(e.target.value)}
                    placeholder="Название чата..."
                    className="flex-1 p-2 rounded bg-gray-700 text-white"
                />
                <button onClick={handleCreateChat} className="ml-2 p-2 bg-green-500 rounded hover:bg-green-600">
                    <FaPlus />
                </button>
            </div>

            {/* Список чатов */}
            <ul className="overflow-y-auto flex-1">
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`p-2 cursor-pointer rounded hover:bg-gray-700 ${activeChat === chat.id ? "bg-gray-600" : ""}`}
                    >
                        {chat.title}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
