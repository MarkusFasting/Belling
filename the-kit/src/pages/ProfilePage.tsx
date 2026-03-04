import { User, Edit, Mail } from "lucide-react";

const preferences = ["Musikk", "Filosofi", "Trening", "Teknologi"];

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6">
      {/* Profilheader */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Markus Profil</h1>
              <p className="text-sm text-muted-foreground">
                Personlig AI-assistent konfigurasjon
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Edit className="w-4 h-4" />
            Rediger
          </button>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Navn</p>
            <p className="text-sm font-medium">Markus</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">E-post</p>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">markus@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferanser */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-3">Preferanser</h2>
        <div className="flex flex-wrap gap-2">
          {preferences.map((pref) => (
            <span
              key={pref}
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {pref}
            </span>
          ))}
        </div>
      </div>

      {/* Personlighetstype */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-2">Personlighetstype</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Kreativ, analytisk og målrettet person som setter pris på dype samtaler
          og personlig utvikling.
        </p>
      </div>

      {/* Mål og Ønsker */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-2">Mål og Ønsker</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ønsker å optimalisere produktivitet, forbedre helse og utforske nye
          ideer gjennom AI-assistanse.
        </p>
      </div>
    </div>
  );
}
