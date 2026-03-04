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

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: any;
  color: string;
}

const stats: StatCard[] = [
  {
    label: "Totale Interaksjoner",
    value: "1 247",
    sub: "23 i dag",
    icon: MessageSquare,
    color: "text-blue-500 bg-blue-50",
  },
  {
    label: "Responstid",
    value: "850ms",
    sub: "Gjennomsnittlig",
    icon: Clock,
    color: "text-green-500 bg-green-50",
  },
  {
    label: "Aktive Moduler",
    value: "8",
    sub: "av 13 totalt",
    icon: Zap,
    color: "text-orange-500 bg-orange-50",
  },
  {
    label: "Læringsfremdrift",
    value: "73%",
    sub: "Personalisering",
    icon: GraduationCap,
    color: "text-purple-500 bg-purple-50",
  },
];

interface ProgressItem {
  label: string;
  value: number;
  icon: any;
}

const progressItems: ProgressItem[] = [
  { label: "Humør Score", value: 85, icon: Smile },
  { label: "Produktivitet", value: 78, icon: TrendingUp },
  { label: "Måloppnåelse", value: 62, icon: Target },
];

export default function StatsPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Overskrift */}
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          AI Statistikk
        </h1>
        <p className="text-sm text-muted-foreground">Oversikt over K.I.T. ytelse</p>
      </div>

      {/* Stat-kort */}
      <div className="space-y-3">
        {stats.map((stat) => {
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
