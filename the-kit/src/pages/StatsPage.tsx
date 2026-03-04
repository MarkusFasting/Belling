import {
  MessageSquare,
  Clock,
  Zap,
  GraduationCap,
  Smile,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useKIT } from "@/contexts/KITContext";

interface ProgressItem {
  label: string;
  value: number;
  icon: any;
}

export default function StatsPage() {
  const { stats, avgResponseTime } = useKIT();

  // Beregn læringsfremdrift basert på antall interaksjoner (maks 100% ved 500+)
  const learningProgress = Math.min(100, Math.round((stats.totalInteractions / 500) * 100));

  // Personlig utvikling basert på faktisk bruk
  const moduleCount = Object.keys(stats.moduleUsage).length;
  const progressItems: ProgressItem[] = [
    {
      label: "Humør Score",
      value: Math.min(100, 50 + stats.totalInteractions * 2),
      icon: Smile,
    },
    {
      label: "Produktivitet",
      value: Math.min(100, 30 + moduleCount * 10 + stats.todayInteractions * 5),
      icon: TrendingUp,
    },
    {
      label: "Måloppnåelse",
      value: Math.min(100, 20 + stats.totalInteractions + moduleCount * 8),
      icon: Target,
    },
  ];

  const statCards = [
    {
      label: "Totale Interaksjoner",
      value: stats.totalInteractions.toLocaleString("nb-NO"),
      sub: `${stats.todayInteractions} i dag`,
      icon: MessageSquare,
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Responstid",
      value: avgResponseTime > 0 ? `${avgResponseTime}ms` : "–",
      sub: "Gjennomsnittlig",
      icon: Clock,
      color: "text-green-500 bg-green-50",
    },
    {
      label: "Aktive Moduler",
      value: "8",
      sub: "av 14 totalt",
      icon: Zap,
      color: "text-orange-500 bg-orange-50",
    },
    {
      label: "Læringsfremdrift",
      value: `${learningProgress}%`,
      sub: "Personalisering",
      icon: GraduationCap,
      color: "text-purple-500 bg-purple-50",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          AI Statistikk
        </h1>
        <p className="text-sm text-muted-foreground">Oversikt over K.I.T. ytelse</p>
      </div>

      {/* Stat-kort */}
      <div className="space-y-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const [iconColor, iconBg] = stat.color.split(" ");
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-border p-4 flex items-center gap-4"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  iconBg
                )}
              >
                <Icon className={cn("w-6 h-6", iconColor)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Personlig Utvikling */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold mb-1">Personlig Utvikling</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Følg din fremgang med AI-assistenten
        </p>

        <div className="space-y-4">
          {progressItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
