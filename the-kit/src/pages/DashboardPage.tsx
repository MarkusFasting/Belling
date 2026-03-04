import { MessageSquare, LayoutGrid, User, Cpu, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useKIT } from "@/contexts/KITContext";

export default function DashboardPage() {
  const { profile, stats, isConnected } = useKIT();

  return (
    <div className="p-4 space-y-6">
      {/* API-status banner */}
      {!isConnected && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Lokal modus</p>
            <p className="text-xs text-amber-600">
              Legg til OpenAI API-nøkkel i .env for ekte AI-svar
            </p>
          </div>
        </div>
      )}

      {/* Velkomst */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Cpu className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Hei, {profile.name}</h1>
            <p className="text-sm text-muted-foreground">Velkommen til K.I.T.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Din autonome AI-assistent er klar. Hva kan jeg hjelpe deg med i dag?
        </p>
      </div>

      {/* Brukerinfo med ekte stats */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{profile.name}</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-success" : "bg-warning"}`} />
              <span className="text-xs text-muted-foreground">
                {isConnected ? "Tilkoblet" : "Lokal modus"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{stats.todayInteractions}</p>
            <p className="text-xs text-muted-foreground">Interaksjoner i dag</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">Aktive moduler</p>
          </div>
        </div>
      </div>

      {/* Hurtiglenker */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/chat"
          className="bg-white rounded-xl border border-border p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium">Chat med K.I.T.</span>
        </Link>
        <Link
          to="/modules"
          className="bg-white rounded-xl border border-border p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors"
        >
          <LayoutGrid className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium">Moduler</span>
        </Link>
      </div>
    </div>
  );
}
