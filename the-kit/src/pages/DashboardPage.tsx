import { MessageSquare, LayoutGrid, User, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Velkomst */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Cpu className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Hei, Markus</h1>
            <p className="text-sm text-muted-foreground">Velkommen til K.I.T.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Din autonome AI-assistent er klar. Hva kan jeg hjelpe deg med i dag?
        </p>
      </div>

      {/* Brukerinfo */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Markus</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Tilkoblet</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-muted-foreground">Interaksjoner</p>
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
