import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null;

  // Fetch products for this admin only
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('admin_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
        <Link href="/dashboard/products/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-medium">
          Add New Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((prod) => (
              <tr key={prod.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prod.title}</div>
                  <div className="text-sm text-gray-500">{prod.categories?.name || 'Uncategorized'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${prod.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.stock_quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {prod.is_published ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                  )}
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No products found. Start by adding one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
