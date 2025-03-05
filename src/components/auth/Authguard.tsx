import { createClient } from './supabaseServer'
import { redirect } from 'next/navigation'

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
