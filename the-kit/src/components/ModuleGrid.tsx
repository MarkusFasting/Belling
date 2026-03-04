import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Mic,
  Brain,
  Zap,
  Database,
  Shield,
  BarChart3,
  Settings,
  Bot,
  Wrench,
  Globe,
  FileText,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "active" | "inactive" | "pending";
  category: string;
}

const modules: Module[] = [
  {
    id: "chat",
    title: "Chat Interface",
    description: "Natural language conversation with K.I.T",
    icon: MessageSquare,
    status: "active",
    category: "Interface",
  },
  {
    id: "voice",
    title: "Voice Interface",
    description: "Voice commands and speech synthesis",
    icon: Mic,
    status: "active",
    category: "Interface",
  },
  {
    id: "reasoning",
    title: "Reasoning Engine",
    description: "Advanced reasoning and decision making",
    icon: Brain,
    status: "pending",
    category: "Core",
  },
  {
    id: "automation",
    title: "Automation",
    description: "Task automation and workflow execution",
    icon: Zap,
    status: "inactive",
    category: "Tools",
  },
  {
    id: "memory",
    title: "Memory Store",
    description: "Persistent memory and context storage",
    icon: Database,
    status: "pending",
    category: "Core",
  },
  {
    id: "security",
    title: "Security Layer",
    description: "Authentication and access control",
    icon: Shield,
    status: "inactive",
    category: "Core",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Usage metrics and performance tracking",
    icon: BarChart3,
    status: "inactive",
    category: "Tools",
  },
  {
    id: "config",
    title: "Configuration",
    description: "System configuration and settings",
    icon: Settings,
    status: "active",
    category: "System",
  },
  {
    id: "agents",
    title: "AI Agents",
    description: "Autonomous agents and multi-step tasks",
    icon: Bot,
    status: "pending",
    category: "Core",
  },
  {
    id: "tools",
    title: "Tool Integration",
    description: "External tools and API integration",
    icon: Wrench,
    status: "inactive",
    category: "Tools",
  },
  {
    id: "web",
    title: "Web Access",
    description: "Web browsing and information retrieval",
    icon: Globe,
    status: "inactive",
    category: "Tools",
  },
  {
    id: "docs",
    title: "Documentation",
    description: "System documentation and guides",
    icon: FileText,
    status: "active",
    category: "System",
  },
];

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-gray-400",
  pending: "bg-yellow-500",
};

const statusText = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

export default function ModuleGrid() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Modules</h2>
        <p className="text-muted-foreground">
          Manage and monitor K.I.T system components
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card
              key={module.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {module.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {module.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        statusColors[module.status]
                      )}
                    />
                    <span className="text-xs font-medium">
                      {statusText[module.status]}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
