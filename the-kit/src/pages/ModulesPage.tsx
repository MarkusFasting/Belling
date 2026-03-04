import { cn } from "@/lib/utils";
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
      { title: "Gmail", description: "E-post integrasjon", icon: Mail, status: "developing" },
      { title: "Google Calendar", description: "Kalender synkronisering", icon: Calendar, status: "developing" },
      { title: "Kontakter", description: "Kontaktadministrasjon", icon: Contact, status: "inactive" },
      { title: "iPhone Apps", description: "iOS app-integrasjon", icon: Smartphone, status: "inactive" },
      { title: "Web Analyse", description: "Nettside-analyse verktøy", icon: Globe, status: "active" },
    ],
  },
  {
    name: "Ekspertmoduler",
    modules: [
      { title: "DJ & Musikk", description: "Musikkproduksjon og DJ-rådgivning", icon: Music, status: "active" },
      { title: "Filosofi", description: "Filosofisk diskusjon og analyse", icon: BookOpen, status: "active" },
      { title: "Psykologi", description: "Psykologisk innsikt og støtte", icon: Brain, status: "active" },
      { title: "Personlig Trener", description: "Treningsveiledning og planer", icon: Dumbbell, status: "active" },
      { title: "Kostholds Ekspert", description: "Ernæring og kostholdsråd", icon: Apple, status: "active" },
    ],
  },
  {
    name: "Personlige Tjenester",
    modules: [
      { title: "Beste Venn", description: "Personlig støtte og vennskap", icon: Heart, status: "active" },
      { title: "Super Sekretær", description: "Organisering og administrative oppgaver", icon: Briefcase, status: "active" },
      { title: "Sparringspartner", description: "Strategisk rådgivning og problemløsning", icon: Lightbulb, status: "active" },
      { title: "Verktøykasse", description: "Diverse nytteverktøy", icon: Wrench, status: "inactive" },
    ],
  },
];

const statusConfig: Record<ModuleStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Aktiv", color: "bg-success", bg: "text-success" },
  developing: { label: "Utvikles", color: "bg-warning", bg: "text-warning" },
  inactive: { label: "Inaktiv", color: "bg-gray-400", bg: "text-gray-400" },
};

const buttonConfig: Record<ModuleStatus, { label: string; style: string }> = {
  active: { label: "Åpne", style: "border-primary text-primary hover:bg-primary/5" },
  developing: { label: "Forhåndsvisning", style: "border-warning text-warning hover:bg-warning/5" },
  inactive: { label: "Ikke tilgjengelig", style: "border-gray-300 text-gray-400 cursor-not-allowed" },
};

export default function ModulesPage() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Moduler</h1>
        <p className="text-sm text-muted-foreground">Administrer K.I.T. systemmoduler</p>
      </div>

      {categories.map((category) => (
        <div key={category.name} className="space-y-3">
          <h2 className="text-lg font-semibold">{category.name}</h2>

          {category.modules.map((module) => {
            const Icon = module.icon;
            const status = statusConfig[module.status];
            const button = buttonConfig[module.status];

            return (
              <div
                key={module.title}
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
                        <span className={cn("text-xs", status.bg)}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {module.description}
                    </p>
                    <button
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
