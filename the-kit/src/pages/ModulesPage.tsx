import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useKIT } from "@/contexts/KITContext";
import {
  Mail,
  Calendar,
  Contact,
  Smartphone,
  Globe,
  Music,
  BookOpen,
  Brain,
  Dumbbell,
  Apple,
  Heart,
  Briefcase,
  Lightbulb,
  Wrench,
} from "lucide-react";

type ModuleStatus = "active" | "developing" | "inactive";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: ModuleStatus;
}

interface ModuleCategory {
  name: string;
  modules: Module[];
}

const categories: ModuleCategory[] = [
  {
    name: "Integrasjoner",
    modules: [
      { id: "gmail", title: "Gmail", description: "E-post integrasjon", icon: Mail, status: "developing" },
      { id: "google-calendar", title: "Google Calendar", description: "Kalender synkronisering", icon: Calendar, status: "developing" },
      { id: "kontakter", title: "Kontakter", description: "Kontaktadministrasjon", icon: Contact, status: "inactive" },
      { id: "iphone-apps", title: "iPhone Apps", description: "iOS app-integrasjon", icon: Smartphone, status: "inactive" },
      { id: "web-analyse", title: "Web Analyse", description: "Nettside-analyse verktøy", icon: Globe, status: "active" },
    ],
  },
  {
    name: "Ekspertmoduler",
    modules: [
      { id: "dj-musikk", title: "DJ & Musikk", description: "Musikkproduksjon og DJ-rådgivning", icon: Music, status: "active" },
      { id: "filosofi", title: "Filosofi", description: "Filosofisk diskusjon og analyse", icon: BookOpen, status: "active" },
      { id: "psykologi", title: "Psykologi", description: "Psykologisk innsikt og støtte", icon: Brain, status: "active" },
      { id: "personlig-trener", title: "Personlig Trener", description: "Treningsveiledning og planer", icon: Dumbbell, status: "active" },
      { id: "kostholds-ekspert", title: "Kostholds Ekspert", description: "Ernæring og kostholdsråd", icon: Apple, status: "active" },
    ],
  },
  {
    name: "Personlige Tjenester",
    modules: [
      { id: "beste-venn", title: "Beste Venn", description: "Personlig støtte og vennskap", icon: Heart, status: "active" },
      { id: "super-sekretar", title: "Super Sekretær", description: "Organisering og administrative oppgaver", icon: Briefcase, status: "active" },
      { id: "sparringspartner", title: "Sparringspartner", description: "Strategisk rådgivning og problemløsning", icon: Lightbulb, status: "active" },
      { id: "verktoykasse", title: "Verktøykasse", description: "Diverse nytteverktøy", icon: Wrench, status: "inactive" },
    ],
  },
];

const statusConfig: Record<ModuleStatus, { label: string; color: string; textColor: string }> = {
  active: { label: "Aktiv", color: "bg-success", textColor: "text-success" },
  developing: { label: "Utvikles", color: "bg-warning", textColor: "text-warning" },
  inactive: { label: "Inaktiv", color: "bg-gray-400", textColor: "text-gray-400" },
};

const buttonConfig: Record<ModuleStatus, { label: string; style: string }> = {
  active: { label: "Åpne", style: "border-primary text-primary hover:bg-primary/5" },
  developing: { label: "Forhåndsvisning", style: "border-warning text-warning hover:bg-warning/5" },
  inactive: { label: "Ikke tilgjengelig", style: "border-gray-300 text-gray-400 cursor-not-allowed" },
};

export default function ModulesPage() {
  const navigate = useNavigate();
  const { stats } = useKIT();

  const activeCount = categories
    .flatMap((c) => c.modules)
    .filter((m) => m.status === "active").length;
  const totalCount = categories.flatMap((c) => c.modules).length;

  function openModule(module: Module) {
    if (module.status === "inactive") return;
    navigate(`/chat?module=${module.id}`);
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Moduler</h1>
          <p className="text-sm text-muted-foreground">
            Administrer K.I.T. systemmoduler
          </p>
        </div>
        <div className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
          {activeCount}/{totalCount} aktive
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.name} className="space-y-3">
          <h2 className="text-lg font-semibold">{category.name}</h2>

          {category.modules.map((module) => {
            const Icon = module.icon;
            const status = statusConfig[module.status];
            const button = buttonConfig[module.status];
            const usageCount = stats.moduleUsage[module.id] || 0;

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">{module.title}</h3>
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", status.color)} />
                        <span className={cn("text-xs", status.textColor)}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {module.description}
                    </p>
                    {usageCount > 0 && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {usageCount} samtale{usageCount !== 1 ? "r" : ""}
                      </p>
                    )}
                    <button
                      onClick={() => openModule(module)}
                      className={cn(
                        "w-full py-2 rounded-lg border text-sm font-medium transition-colors",
                        button.style
                      )}
                      disabled={module.status === "inactive"}
                    >
                      {button.label}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
