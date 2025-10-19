import React from 'react'
import { useProductStore } from '../store/useProductStore.js'
import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from 'lucide-react';
import ProductCard from '../component/ProductCard';
import AddProductModel from '../component/AddProductModel.jsx';

function HomePage() {
  const {products, loading, error, fetchProducts} = useProductStore();
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  
  return (
    <main className='max-w-6xl mx-auto px-4 py-8 '>
      <div className='flex  justify-between items-center mb-8'>
        <button className='btn btn-primary ' onClick={() => document.getElementById("add_product_modal").showModal()}>
          <PlusCircleIcon className='size-5 mr-2'/>
          Add 
        </button>
        <button className='btn btn-ghost btn-circle' onClick={fetchProducts}>
          <RefreshCcwIcon className="size-5"/>
        </button>
      </div>

      <AddProductModel />

      {error && <div className='alert alert-error mb-8'>{error}</div>}


{products.length === 0 && !loading && (
  <div className='flex flex-col justify-center items-center h-96 space-y-4' >
    <div className='bg-base-100 rounded-full p-6'>
      <PackageIcon className='size-12' />
    </div>
    <div className='text-center space-y-2'>
      <h3 className='text-2xl font-semibold '>There is no product found here</h3>
      <p className='text-gray-500 max-w-sm'> add a product</p>
    </div>
  </div>
)}



      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='loading loading-spinner loading-lg'/>
        </div>
      ) : ( <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>)}
    </main>
  )
}

export default HomePage
