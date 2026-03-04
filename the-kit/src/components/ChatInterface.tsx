import React, { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input) return;
    setMessages([...messages, input]);
    setInput("");
  }

  return (
    <div style={{marginTop:20}}>
      <h2>Chat with K.I.T</h2>

      <div style={{border:"1px solid #333", padding:10, minHeight:120}}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <div style={{marginTop:10}}>
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask K.I.T something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
