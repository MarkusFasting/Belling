import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MessageSquare,
  Mic,
  Settings,
  User,
  LayoutGrid,
  Activity,
  Cpu,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface KITLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/chat", label: "Chat", icon: MessageSquare },
  { path: "/voice", label: "Voice", icon: Mic },
  { path: "/modules", label: "Modules", icon: LayoutGrid },
  { path: "/stats", label: "Stats", icon: Activity },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function KITLayout({
  children,
  title = "K.I.T",
  subtitle = "Autonomous AI System",
}: KITLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "border-r bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" />
                    Collapse
                  </>
                )}
              </Button>
            </div>

            <Separator />

            <ScrollArea className="flex-1">
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-11",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {!collapsed && <span>{item.label}</span>}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>

            <Separator />

            <div className="p-4">
              <div
                className={cn(
                  "bg-muted/50 rounded-lg p-3",
                  collapsed && "p-2"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {!collapsed && (
                    <div>
                      <p className="text-sm font-medium">System Online</p>
                      <p className="text-xs text-muted-foreground">
                        All systems operational
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
