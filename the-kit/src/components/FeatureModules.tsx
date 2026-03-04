import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Zap,
  Shield,
  Database,
  MessageSquare,
  Mic,
  Bot,
  Wrench,
} from "lucide-react";

interface FeatureModule {
  title: string;
  description: string;
  icon: any;
  status: string;
  action: string;
}

const featureModules: FeatureModule[] = [
  {
    title: "Conversational AI",
    description: "Advanced chat interface with context awareness and natural responses",
    icon: MessageSquare,
    status: "Ready",
    action: "Open Chat",
  },
  {
    title: "Voice Commands",
    description: "Voice input and speech output for hands-free interaction",
    icon: Mic,
    status: "Ready",
    action: "Start Voice",
  },
  {
    title: "Reasoning Engine",
    description: "Multi-step reasoning and complex problem solving capabilities",
    icon: Brain,
    status: "In Development",
    action: "Configure",
  },
  {
    title: "Automation Tools",
    description: "Automated task execution and workflow management system",
    icon: Zap,
    status: "Planned",
    action: "Setup",
  },
  {
    title: "Security Layer",
    description: "Authentication, permissions, and secure access control",
    icon: Shield,
    status: "Planned",
    action: "Enable",
  },
  {
    title: "Memory System",
    description: "Persistent memory storage and context retrieval",
    icon: Database,
    status: "In Development",
    action: "Manage",
  },
  {
    title: "AI Agents",
    description: "Autonomous agents for complex multi-task operations",
    icon: Bot,
    status: "Planned",
    action: "Deploy",
  },
  {
    title: "Tool Integration",
    description: "Connect external APIs and tools to expand K.I.T capabilities",
    icon: Wrench,
    status: "Planned",
    action: "Connect",
  },
];

export default function FeatureModules() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Core Features</h2>
        <p className="text-muted-foreground">
          Essential modules powering the K.I.T system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {featureModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{module.title}</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {module.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {module.description}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    {module.action}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
