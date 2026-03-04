import React, { createContext, useContext, useState } from "react";

type KITState = {
  status: string;
  setStatus: (s: string) => void;
};

const KITContext = createContext<KITState | null>(null);

export function KITProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState("operational");

  return (
    <KITContext.Provider value={{ status, setStatus }}>
      {children}
    </KITContext.Provider>
  );
}

export function useKIT() {
  const ctx = useContext(KITContext);
  if (!ctx) throw new Error("useKIT must be used inside KITProvider");
  return ctx;
}
