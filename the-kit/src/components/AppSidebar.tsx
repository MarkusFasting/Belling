import { Link } from "react-router-dom";
import { Home, MessageSquare, Mic, Settings } from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-60 border-r min-h-screen p-4 space-y-4">
      <Link to="/" className="flex items-center gap-2">
        <Home size={18} />
        Dashboard
      </Link>

      <Link to="/chat" className="flex items-center gap-2">
        <MessageSquare size={18} />
        Chat
      </Link>

      <Link to="/voice" className="flex items-center gap-2">
        <Mic size={18} />
        Voice
      </Link>

      <Link to="/settings" className="flex items-center gap-2">
        <Settings size={18} />
        Settings
      </Link>
    </aside>
  );
}
