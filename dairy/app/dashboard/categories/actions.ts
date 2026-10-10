'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCategory(formData: FormData): Promise<void> {
  const supabase = await createClient()

  // Verify super admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'super_admin') throw new Error('Forbidden')

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  const { error } = await supabase.from('categories').insert({
    name,
    slug,
    description
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/categories')
}
