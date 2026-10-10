import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-gray-900 opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium Dairy Products, <br /> Delivered to You.
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover a curated marketplace of farm-fresh dairy from top independent producers. 
            Quality you can taste, sourced with integrity.
          </p>
          <div className="mt-10 max-w-sm sm:max-w-none sm:flex sm:justify-center lg:justify-start">
            <Link href="/products" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition">
              Shop Now
            </Link>
            <Link href="/about" className="mt-3 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70 sm:mt-0 sm:ml-3 md:py-4 md:text-lg md:px-10 transition">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories (Placeholder) */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Shop by Category</h2>
          <Link href="/categories" className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Milk & Cream</span>
          </div>
          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:relative sm:h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Artisan Cheese</span>
          </div>
          <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:relative sm:h-full bg-gray-100 flex items-center justify-center">
             <span className="text-gray-400">Butter & Yogurt</span>
          </div>
        </div>
      </div>
    </div>
  )
}
