import { supabase, type User, type UserType } from './supabase'

export async function signUp(email: string, password: string, nome: string, tipo_usuario: UserType = 'comum') {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError

  if (authData.user) {
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        nome,
        tipo_usuario,
      })

    if (userError) throw userError
  }

  return authData
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return null
  return data
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.tipo_usuario === 'admin'
}
