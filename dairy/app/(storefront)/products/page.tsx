import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function StorefrontProductsPage() {
  const supabase = await createClient()

  // Fetch all published products
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name), profiles(first_name, last_name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">All Products</h1>
          <p className="mt-4 text-base text-gray-500">
            Browse our entire collection of premium dairy products from multiple verified producers.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full h-72 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 group-hover:opacity-75">
                <span className="text-gray-400">No Image Available</span>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-semibold">
                    <Link href={`/products/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.categories?.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">By {product.profiles?.first_name || 'Admin'} {product.profiles?.last_name || ''}</p>
            </div>
          ))}

          {(!products || products.length === 0) && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No products found in the store yet. Check back later!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
