import { useState } from "react";
import ChatSidebar from "@/components/ChatSidebar";

export default function AIChat() {
    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="flex h-screen">
            {/* Боковая панель с чатами */}
            <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />

            {/* Основное окно чата */}
            <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6">
                {activeChat ? (
                    <p className="text-lg">Открыт чат {activeChat}</p>
                ) : (
                    <div className="text-center text-gray-500">
                        {/* <p>Это начало вашей консультации с</p> */}
                        <p>скора все будет</p>

                        <h1 className="text-2xl font-bold text-gray-700">QUNAR.AI</h1>
                    </div>
                )}
            </main>
        </div>
    );
}
