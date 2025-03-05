'use client';

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

export default function ChatBoard() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Controls visibility of the chat window
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     try {
//       const response = await axios.post('http://localhost:11434/api/chat', {
        
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'llama3.2',
//           messages: [...messages, userMessage],
//         }),
//       });

//       if (!response.body) throw new Error('No response body');

//       const reader = response.body.getReader();
//       let aiResponse = '';

//       // Initialize assistant message *immediately*
//       setMessages(prev => [...prev, { role: 'assistant', content: '' }]);


//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         const text = new TextDecoder().decode(value);
//         const lines = text.split('\n').filter(line => line.trim());

//         for (const line of lines) {
//           try {
//             const data = JSON.parse(line);
//             if (data.message?.content) {
//               aiResponse += data.message.content;

//               // *Crucially* update the last message in the array
//               setMessages(prevMessages => {
//                 const newMessages = [...prevMessages];
//                 const lastMessage = newMessages[newMessages.length - 1];
//                 if (lastMessage && lastMessage.role === 'assistant') {
//                   lastMessage.content = aiResponse;
//                 }
//                 return newMessages;
//               });
//             }
//           } catch (e) {
//             console.error('Error parsing JSON:', e);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);

  try {
    const response = await axios.post(
      'http://localhost:11434/api/chat',
      {
        model: 'llama3', // Corrected model name (removed .2)
        messages: [...messages, userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'stream', // Crucial: Set responseType to 'stream'
      }
    );

    // Access the stream directly from response.data
    const stream = response.data;
    const reader = stream.getReader(); // Get a reader from the stream
    let aiResponse = '';

    // Initialize the assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = new TextDecoder().decode(value);
      const lines = text.split('\n').filter(line => line.trim());
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
              if (data.message?.content) {
                aiResponse += data.message.content;

                setMessages(prevMessages => {
                  const newMessages = [...prevMessages];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.role === 'assistant') {
                    lastMessage.content = aiResponse;
                  }
                  return newMessages;
                });
            }
          } catch (e) {
            console.error('Error parsing JSON:', line, e); // Log the problematic line
          }
        }
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle Axios-specific errors more gracefully
    if (axios.isAxiosError(error)) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, there was an error: ${error.message}` }]);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an unexpected error.' }]);
    }
  } finally {
    setIsTyping(false);
  }
};
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };


  return (
    <div className="relative">
      {/* Chat Button (Visible when chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-8 right-5 bg-red-500 text-xl hover:bg-red-700 text-white font-bold p-4 rounded-full z-50"
        >
          💬 Chat with us
        </button>
      )}

      {/* Chat Window (Visible when chat is open) */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 rounded-xl  w-full max-w-md  bg-white border rounded-t-lg shadow-lg flex flex-col h-[80vh] z-40">
           {/* Close Button */}
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
            <div className="bg-gray-100 p-4 border-b rounded-t-2xl">
            <h2 className="text-lg font-semibold">Fire Safety Guide</h2>
          </div>

          {/* Message Display Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
              <div className="text-center text-gray-500 my-8">
                <p className="text-lg font-medium">Welcome to the Fire Safety Guide assignment!</p>
                <p className="mt-2">Ask any questions about fire safety and we'll provide helpful responses.</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
              <div className="bg-gray-200 rounded-lg p-3 flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
              </div>
            </div>
            )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input and Send Button */}
          <form onSubmit={handleSubmit} className="border-t p-4 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full"
              disabled={isTyping}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}