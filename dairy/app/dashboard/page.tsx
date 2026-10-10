import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile to determine role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Welcome back, {profile?.first_name || user.email}!
          </p>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
            <ul className="mt-2 text-sm text-gray-600">
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Role:</strong> <span className="uppercase font-medium text-indigo-600">{profile?.role || 'CUSTOMER'}</span></li>
              <li><strong>Status:</strong> {profile?.status || 'ACTIVE'}</li>
            </ul>
          </div>
          
          <form action="/auth/signout" method="post" className="mt-8">
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
