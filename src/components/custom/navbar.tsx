'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  LogOut,
  Shield,
  Home
} from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user, isAdmin } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const navItems = [
    { href: '/dashboard', label: 'Início', icon: Home, public: true },
    { href: '/championships', label: 'Campeonatos', icon: Trophy, public: true },
    { href: '/teams', label: 'Times', icon: Users, public: true },
    { href: '/matches', label: 'Partidas', icon: Calendar, public: true },
    { href: '/standings', label: 'Classificação', icon: BarChart3, public: true },
  ]

  const adminItems = [
    { href: '/admin/championships', label: 'Gerenciar Campeonatos', icon: Shield },
    { href: '/admin/teams', label: 'Gerenciar Times', icon: Shield },
    { href: '/admin/players', label: 'Gerenciar Jogadores', icon: Shield },
  ]

  if (!user) return null

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-white">
            <Trophy className="w-6 h-6 text-emerald-500" />
            <span className="hidden sm:inline">Liga do Clube</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}

            {isAdmin && (
              <>
                <div className="w-px h-6 bg-gray-700 mx-2" />
                {adminItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white'
                          : 'text-amber-400 hover:bg-gray-800 hover:text-amber-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Link>
                  )
                })}
              </>
            )}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.nome}</p>
              <p className="text-xs text-gray-400">
                {isAdmin ? '👑 Admin' : '👤 Usuário'}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}

            {isAdmin && (
              <>
                <div className="h-px bg-gray-700 my-2" />
                <p className="px-3 py-2 text-xs font-semibold text-amber-400 uppercase">
                  Administração
                </p>
                {adminItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white'
                          : 'text-amber-400 hover:bg-gray-700 hover:text-amber-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </>
            )}

            <div className="h-px bg-gray-700 my-2" />
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-white">{user.nome}</p>
              <p className="text-xs text-gray-400">
                {isAdmin ? '👑 Admin' : '👤 Usuário'}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
