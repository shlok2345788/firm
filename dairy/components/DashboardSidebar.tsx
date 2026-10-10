import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardSidebar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let role = 'customer'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    if (profile) {
      role = profile.role
    }
  }

  return (
    <div className="flex w-64 flex-col bg-gray-900">
      <div className="flex h-16 shrink-0 items-center bg-gray-900 px-6">
        <Link href="/" className="text-xl font-bold text-white">
          DairyFirm Admin
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link href="/dashboard" className="bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            Overview
          </Link>

          {role === 'customer' && (
            <>
              <Link href="/dashboard/orders" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                My Orders
              </Link>
              <Link href="/dashboard/addresses" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Addresses
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link href="/dashboard/products" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Products
              </Link>
              <Link href="/dashboard/orders" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Customer Orders
              </Link>
            </>
          )}

          {role === 'super_admin' && (
            <>
              <Link href="/dashboard/admins" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Manage Admins
              </Link>
              <Link href="/dashboard/all-products" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                All Products
              </Link>
              <Link href="/dashboard/categories" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Categories
              </Link>
            </>
          )}
          
          <div className="mt-8">
            <form action="/auth/signout" method="post">
              <button type="submit" className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  )
}
