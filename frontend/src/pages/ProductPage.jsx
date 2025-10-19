import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from '../store/useproductStore';
import { ArrowLeftIcon, LogIn, SaveIcon, Trash2Icon } from 'lucide-react';


function ProductPage() {



   


  const { 
  currentProduct,
  formData,
  setFormData,
  loading,
  error,
  fetchProduct,
  updateProduct,
  deleteProduct,
} = useProductStore();

  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;
  const { id } = product;



   useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
      });
    }
  }, [product, setFormData]);


  // useEffect(() => {
  //   fetchProduct(id)
  // }, [fetchProduct, id]);

  // console.log(product);

const handleDelete = async () => {
  if(window.confirm("Are you sure you want to delete this product?")) {
  await deleteProduct(id);
  navigate("/");
  }
}






  if (loading) {
    return (<div className='flex justify-center items-center min-h-screen'> 
      <div className='loading loading-spiner loading-lg'></div>
    </div>
    );
  }

    if (error) {
      return <div className='container mx-auto px-4 py-8'> 
        <div className='alert alert-error'>{error}</div>
       </div>
    }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <button onClick={() => navigate("/")
        
      } className="btn btn-ghost mb-8">
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to Home
      </button>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='rounded-lg overflow-hidden shadow-lg bg-base-100'>
          <img 
          src={product?.image} 
          alt={product?.name} 
          className='size-full object-cover'/>
        </div>

        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title text-2xl font-bold mb-6'>Edit Product</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id)       
              navigate("/");
            }}
            className='space-y-6'
            >
              {/* name */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Product Name</span>
                </label>
                <input 
                type="text"
                placeholder='Enter Name of Product'
                className='input input-bordered w-full'
                value={formData.name}
                onChange={(e) => setFormData({...formData, name:e.target.value})}
                 />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Price</span>
                </label>
                <input 
                type="number"
                min="0"
                step="0.01"
                placeholder='0.00'
                className='input input-bordered w-full'
                value={formData.price}
                onChange={(e) => setFormData({...formData, price:e.target.value})}
                 />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>Image URl</span>
                </label>
                <input 
                type="text"
                placeholder='https://exemple.com/image.jpg'
                className='input input-bordered w-full'
                value={formData.image}
                onChange={(e) => setFormData({...formData, image:e.target.value})}
                 />
              </div>

              <div className='flex justify-between mt-8'>
                <button type='button '  onClick={handleDelete}className='btn btn-error'><Trash2Icon className='size-4 mr-2' />Delete Product
                </button>

                <button                   
                  type='submit' 
                  className='btn btn-primary'
                  disabled={loading || !formData.name || !formData.price || !formData.image}>
                  {loading ? (
                    <span className='loading loading-spinner loading-sm'></span>
                  ) : (
                    <>
                      <SaveIcon className='size-4 mr-2' /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>

            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
