'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData): Promise<void> {
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Must be admin or super_admin
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role === 'customer') throw new Error('Forbidden')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const sku = formData.get('sku') as string
  const price = parseFloat(formData.get('price') as string)
  const stock_quantity = parseInt(formData.get('stock_quantity') as string)
  const category_id = formData.get('category_id') as string

  const { error } = await supabase.from('products').insert({
    admin_id: user.id, // The current admin is the owner
    category_id: category_id || null,
    title,
    slug,
    description,
    sku,
    price,
    stock_quantity,
    is_published: true
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}
