import React, { useState, useRef, useEffect } from 'react'; 
import api from '../components/api';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/prompt', {
        content: input,
      });

      if (response.status === 200) {
        const botMessage = { role: 'bot', content: response.data?.steps.pop() || 'No response' };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Error generating response. Refresh me and try again' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    
    <div className="flex items-start gap-6 p-4 max-w-7xl mx-auto ">
      <div className="w-1/3 h-full ">
      <div className='border-1 border-stone-300 rounded-lg w-full h-full p-8 py-45 bg-white flex items-center justify-center'>
        <h2><span className='text-red-500 text-xl font-semibold'>*</span>Feature is under development</h2>
      </div>
      </div>
      <div className=" w-2/3 bg-white shadow-xl rounded-xl flex flex-col h-[80vh] overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-900 self-start mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 animate-pulse p-3 bg-gray-100 rounded-lg w-fit">
              Typing...
            </div>
          )}

         
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-300 p-4 flex items-center gap-2">
          <textarea
            className="w-full p-2 border border-stone-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
