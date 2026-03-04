import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useKIT } from "@/contexts/KITContext";
import {
  Home,
  MessageSquare,
  LayoutGrid,
  BarChart3,
  User,
  Menu,
  X,
  Cpu,
  Wifi,
  WifiOff,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Hjem", icon: Home },
  { path: "/chat", label: "Chat", icon: MessageSquare },
  { path: "/modules", label: "Moduler", icon: LayoutGrid },
  { path: "/stats", label: "Statistikk", icon: BarChart3 },
  { path: "/profile", label: "Profil", icon: User },
];

export default function MobileLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { profile, isConnected } = useKIT();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-muted"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">K.I.T.</span>
          </div>

          <div className="p-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-success" />
            ) : (
              <WifiOff className="w-5 h-5 text-warning" />
            )}
          </div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 bg-white border-r border-border transition-transform duration-200",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Brukerinfo nederst i sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{profile.name}</p>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-success" : "bg-warning"}`} />
                <span className="text-xs text-muted-foreground">
                  {isConnected ? "Tilkoblet" : "Lokal modus"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Innhold */}
      <main className="pb-6">{children}</main>
    </div>
  );
}
