import { supabase, type User, type UserType } from './supabase'

export async function signUp(email: string, password: string, nome: string, tipo_usuario: UserType = 'comum') {
  if (!supabase) {
    throw new Error('Supabase não configurado. Configure as variáveis de ambiente.')
  }

  try {
    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: {
          nome,
          tipo_usuario,
        }
      }
    })

    if (authError) {
      console.error('Erro no Supabase Auth:', authError)
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Erro ao criar usuário')
    }

    // Inserir dados do usuário na tabela users
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        nome,
        email,
        tipo_usuario,
      })

    if (userError) {
      console.error('Erro ao inserir na tabela users:', userError)
      throw new Error('Erro ao salvar dados do usuário. Verifique se a tabela users está configurada corretamente.')
    }

    return authData
  } catch (error: any) {
    console.error('Erro completo no signUp:', error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase não configurado. Configure as variáveis de ambiente.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  if (!supabase) {
    throw new Error('Supabase não configurado. Configure as variáveis de ambiente.')
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) {
    return null
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) return null
    return data
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    return user?.tipo_usuario === 'admin'
  } catch (error) {
    return false
  }
}
