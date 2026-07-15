// Adding the ChatWidget into the website
import { useState } from 'react';
import './ChatWidget.css';

const API_BASE = 'https://ai-chatbot-227u.onrender.com';

function getSessionId() {
  let id = localStorage.getItem('chat_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('chat_session_id', id);
  }
  return id;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg) return;

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setIsSending(true);
    setIsTyping(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, session_id: getSessionId() }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.error || 'Something went wrong. Please try again.' }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'bot',
          text: data.answer || 'Sorry, no answer found.',
          sources: data.sources || []
        }]);
      }
    } catch (e) {
      clearTimeout(timeoutId);
      const errText = e.name === 'AbortError' ? 'That took too long — please try again.' : 'Connection error.';
      setMessages(prev => [...prev, { role: 'bot', text: errText }]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleToggle = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening && messages.length === 0) {
      setMessages([{
        role: 'bot',
        text: "Hi there! 👋 I'm your support assistant. Ask me anything about our services, pricing, or products."
      }]);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button id="chat-toggle" onClick={handleToggle}>💬</button>
      <div id="chat-window" className={isOpen ? 'open' : ''}>
        <div className="chat-header">
          <div className="bot-avatar">🤖</div>
          <div className="header-info">
            <h3>Support Bot</h3>
            <p>We're online</p>
          </div>
          <div className="online-dot"></div>
        </div>
        <div id="messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="bubble">{m.text}</div>
              {m.sources?.length > 0 && (
                <div className="source-tag">📄 {m.sources.join(', ')}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="bubble"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            id="user-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isSending}
          />
          <button id="send-btn" onClick={sendMessage} disabled={isSending}>➤</button>
        </div>
      </div>
    </>
  );
}