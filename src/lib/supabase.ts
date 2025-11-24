import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type UserType = 'admin' | 'comum'

export interface User {
  id: string
  nome: string
  tipo_usuario: UserType
  created_at: string
}

export interface Category {
  id: string
  nome: string
  descricao?: string
  created_at: string
}

export interface Championship {
  id: string
  nome: string
  category_id: string
  data_inicio?: string
  data_fim?: string
  status: 'ativo' | 'finalizado' | 'cancelado'
  created_at: string
}

export interface Team {
  id: string
  nome: string
  escudo_url?: string
  created_at: string
}

export interface Player {
  id: string
  nome: string
  team_id: string
  posicao?: string
  numero?: number
  foto_url?: string
  created_at: string
}

export interface Match {
  id: string
  championship_id: string
  team_home_id: string
  team_away_id: string
  data_partida: string
  gols_home: number
  gols_away: number
  status: 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada'
  created_at: string
}

export interface Goal {
  id: string
  match_id: string
  player_id: string
  team_id: string
  minuto?: number
  created_at: string
}

export interface Card {
  id: string
  match_id: string
  player_id: string
  tipo: 'amarelo' | 'vermelho'
  minuto?: number
  created_at: string
}
