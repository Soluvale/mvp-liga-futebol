'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      <p className="mt-4 text-gray-400">Carregando...</p>
    </div>
  )
}
