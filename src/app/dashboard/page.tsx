'use client'

import { useAuth } from '@/components/providers/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Users, Calendar, BarChart3, Shield } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isAdmin } = useAuth()

  const publicCards = [
    {
      title: 'Campeonatos',
      description: 'Veja todos os campeonatos ativos',
      icon: Trophy,
      href: '/championships',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Times',
      description: 'Confira os times cadastrados',
      icon: Users,
      href: '/teams',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Partidas',
      description: 'Acompanhe as partidas agendadas',
      icon: Calendar,
      href: '/matches',
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Classificação',
      description: 'Veja a tabela de classificação',
      icon: BarChart3,
      href: '/standings',
      color: 'from-orange-500 to-red-600',
    },
  ]

  const adminCards = [
    {
      title: 'Gerenciar Campeonatos',
      description: 'Criar e editar campeonatos',
      icon: Shield,
      href: '/admin/championships',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      title: 'Gerenciar Times',
      description: 'Adicionar e editar times',
      icon: Shield,
      href: '/admin/teams',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      title: 'Gerenciar Jogadores',
      description: 'Cadastrar e editar jogadores',
      icon: Shield,
      href: '/admin/players',
      color: 'from-amber-500 to-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Bem-vindo, {user?.nome}! 👋
          </h1>
          <p className="text-gray-400">
            {isAdmin 
              ? '🔑 Você tem acesso administrativo completo ao sistema.'
              : '👀 Você pode visualizar todas as informações dos campeonatos.'}
          </p>
        </div>

        {/* Public Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Navegação Rápida</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {publicCards.map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.href} href={card.href}>
                  <Card className="bg-gray-800 border-gray-700 hover:border-emerald-500 transition-all cursor-pointer h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{card.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Admin Cards */}
        {isAdmin && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              Área Administrativa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminCards.map((card) => {
                const Icon = card.icon
                return (
                  <Link key={card.href} href={card.href}>
                    <Card className="bg-gray-800 border-amber-700 hover:border-amber-500 transition-all cursor-pointer h-full">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-amber-400">{card.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {card.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-emerald-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sistema de Gestão de Campeonatos
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  O <strong>Liga do Clube</strong> permite gerenciar campeonatos de futebol de forma completa. 
                  {isAdmin 
                    ? ' Como administrador, você pode criar campeonatos, cadastrar times e jogadores, registrar partidas e acompanhar a classificação em tempo real.'
                    : ' Você pode acompanhar todos os campeonatos, times, jogadores e a classificação atualizada.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
