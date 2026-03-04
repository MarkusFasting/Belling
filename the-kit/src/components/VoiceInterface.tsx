import React from "react";

export default function VoiceInterface() {

  function startVoice() {
    console.log("Voice input started");
  }

  return (
    <div style={{marginTop:20}}>
      <h2>Voice Interface</h2>
      <button onClick={startVoice}>Start Voice</button>
    </div>
  );
}
