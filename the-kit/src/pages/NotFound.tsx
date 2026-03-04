import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Siden ble ikke funnet</p>
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Home className="w-4 h-4" />
        Tilbake til hjem
      </Link>
    </div>
  );
}
