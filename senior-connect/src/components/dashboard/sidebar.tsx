'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  User,
  Search,
  Heart,
  MessageSquare,
  CreditCard,
  Settings,
  Shield,
  LogOut,
  Menu,
  Users,
  Building2,
  LayoutDashboard,
} from 'lucide-react'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const seniorNav: NavItem[] = [
  { label: 'Profil', href: '/senior/profil', icon: <User className="h-5 w-5" /> },
  { label: 'Henvendelser', href: '/senior/henvendelser', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Innstillinger', href: '/senior/innstillinger', icon: <Settings className="h-5 w-5" /> },
]

const employerNav: NavItem[] = [
  { label: 'Søk', href: '/arbeidsgiver/sok', icon: <Search className="h-5 w-5" /> },
  { label: 'Favoritter', href: '/arbeidsgiver/favoritter', icon: <Heart className="h-5 w-5" /> },
  { label: 'Henvendelser', href: '/arbeidsgiver/henvendelser', icon: <MessageSquare className="h-5 w-5" /> },
  { label: 'Abonnement', href: '/arbeidsgiver/abonnement', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Innstillinger', href: '/arbeidsgiver/innstillinger', icon: <Settings className="h-5 w-5" /> },
]

const adminNav: NavItem[] = [
  { label: 'Oversikt', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Seniorer', href: '/admin/seniorer', icon: <Users className="h-5 w-5" /> },
  { label: 'Arbeidsgivere', href: '/admin/arbeidsgivere', icon: <Building2 className="h-5 w-5" /> },
  { label: 'Henvendelser', href: '/admin/henvendelser', icon: <MessageSquare className="h-5 w-5" /> },
]

function getNavItems(role: string): NavItem[] {
  switch (role) {
    case 'senior':
      return seniorNav
    case 'employer':
      return employerNav
    case 'admin':
      return adminNav
    default:
      return []
  }
}

function NavLinks({ items, pathname, onItemClick }: { items: NavItem[]; pathname: string; onItemClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SignOutButton() {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start gap-3 text-base text-gray-700 hover:text-red-600 hover:bg-red-50 px-3 py-3 h-auto"
      >
        <LogOut className="h-5 w-5" />
        Logg ut
      </Button>
    </form>
  )
}

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navItems = getNavItems(role)

  return (
    <>
      {/* Mobile header with hamburger */}
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Senior Connect
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant="ghost" size="icon" aria-label="Åpne meny">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="text-lg font-bold text-blue-700">Senior Connect</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between h-[calc(100%-65px)]">
              <div className="p-4">
                <NavLinks items={navItems} pathname={pathname} onItemClick={() => setOpen(false)} />
              </div>
              <div className="p-4 border-t">
                <SignOutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:border-r md:bg-white md:min-h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold text-blue-700">
            Senior Connect
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="p-4">
            <NavLinks items={navItems} pathname={pathname} />
          </div>
          <div className="p-4 border-t">
            <SignOutButton />
          </div>
        </div>
      </aside>
    </>
  )
}
