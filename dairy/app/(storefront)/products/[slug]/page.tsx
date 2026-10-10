import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name), profiles(first_name, last_name)')
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery placeholder */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-96">
               <span className="text-gray-400">No Image Available</span>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Category: <span className="font-medium text-gray-900">{product.categories?.name || 'Uncategorized'}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Seller: <span className="font-medium text-gray-900">{product.profiles?.first_name || 'Admin'} {product.profiles?.last_name || ''}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Availability: <span className="font-medium text-gray-900">{product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}</span>
              </p>
            </div>

            <form className="mt-8">
              <div className="flex">
                <button
                  type="button"
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  disabled={product.stock_quantity === 0}
                >
                  {product.stock_quantity > 0 ? 'Add to cart' : 'Out of stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
