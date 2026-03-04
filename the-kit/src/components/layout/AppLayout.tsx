import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <div className="content">{children}</div>
    </div>
  );
}
