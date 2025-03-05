"use client";
import { useState } from "react";
import Button from "./Button";
import Send from "./icons/Send";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "bot", text: data.reply }]);
  };

  return (
    <div>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-700 transition text-lg font-semibold"
      >
        💬 Chat with Us
      </button>

      {/* Chatbox UI */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white shadow-lg shadow-white w-[25vw] border border-transparent rounded-xl p-4">
          <h3 className="text-2xl  mb-3 text-center font-extrabold text-red-600">Fire Safety Chatbot</h3>

          <div className="h-[60vh] z-10 overflow-y-auto space-y-3 p-2 border border-transparent bg-white rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-lg max-w-full ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field & Send Button */}
          <div className="mt-3 flex">
            <input
              type="text"
              className="flex-1 text-white font-semibold p-3 border border-gray-800 bg-gray-600/80 rounded-l-full text-lg focus:outline-none placeholder:text-white/80 placeholder:font-semibold"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-gray-500 text-white px-4 py-3 rounded-r-full text-lg font-semibold hover:bg-gray-800 transition"
            ><Send /></button>
              
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;