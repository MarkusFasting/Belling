import { useState } from "react";
import { User, Edit, Mail, Save, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKIT } from "@/contexts/KITContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useKIT();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [newPref, setNewPref] = useState("");

  function startEditing() {
    setDraft({ ...profile });
    setIsEditing(true);
  }

  function saveChanges() {
    updateProfile(draft);
    setIsEditing(false);
  }

  function cancelEditing() {
    setDraft(profile);
    setIsEditing(false);
  }

  function addPreference() {
    const pref = newPref.trim();
    if (pref && !draft.preferences.includes(pref)) {
      setDraft({ ...draft, preferences: [...draft.preferences, pref] });
      setNewPref("");
    }
  }

  function removePreference(pref: string) {
    setDraft({
      ...draft,
      preferences: draft.preferences.filter((p) => p !== pref),
    });
  }

  const data = isEditing ? draft : profile;

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
              <h1 className="text-xl font-bold">{data.name} Profil</h1>
              <p className="text-sm text-muted-foreground">
                Personlig AI-assistent konfigurasjon
              </p>
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={cancelEditing}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={saveChanges}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Lagre
              </button>
            </div>
          ) : (
            <button
              onClick={startEditing}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              <Edit className="w-4 h-4" />
              Rediger
            </button>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Navn</p>
            {isEditing ? (
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            ) : (
              <p className="text-sm font-medium">{data.name}</p>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">E-post</p>
            {isEditing ? (
              <input
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">{data.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferanser */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-3">Preferanser</h2>
        <div className="flex flex-wrap gap-2">
          {data.preferences.map((pref) => (
            <span
              key={pref}
              className={cn(
                "px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium",
                isEditing && "pr-1.5 flex items-center gap-1"
              )}
            >
              {pref}
              {isEditing && (
                <button
                  onClick={() => removePreference(pref)}
                  className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {isEditing && (
            <div className="flex items-center gap-1">
              <input
                value={newPref}
                onChange={(e) => setNewPref(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPreference()}
                placeholder="Ny..."
                className="w-20 h-7 px-2 rounded-full border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={addPreference}
                className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20"
              >
                <Plus className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Personlighetstype */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-2">Personlighetstype</h2>
        {isEditing ? (
          <textarea
            value={draft.personality}
            onChange={(e) => setDraft({ ...draft, personality: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.personality}
          </p>
        )}
      </div>

      {/* Mål og Ønsker */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-2">Mål og Ønsker</h2>
        {isEditing ? (
          <textarea
            value={draft.goals}
            onChange={(e) => setDraft({ ...draft, goals: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.goals}
          </p>
        )}
      </div>
    </div>
  );
}
