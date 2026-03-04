import React from "react";
import AIStats from "./AIStats";
import ChatInterface from "./ChatInterface";

export default function Dashboard() {
  return (
    <div>
      <h1>K.I.T Control Panel</h1>
      <AIStats />
      <ChatInterface />
    </div>
  );
}
