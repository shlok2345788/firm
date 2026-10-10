import DashboardSidebar from '@/components/DashboardSidebar'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
