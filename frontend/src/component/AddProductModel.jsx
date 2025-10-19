import React from 'react'
import { useProductStore } from '../store/useProductStore'
// import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from 'lucide-react';
import { DollarSign, Image, Package2, PlusCircle } from 'lucide-react';

function AddProductModel() {
    const {addProduct, formData, setFormData, loading} = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
        <div className='modal-box'>
            {/* close sign */}

            <form method="dialog">
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>x</button>
            </form>

            {/* header */}
            <h3 className="font-bold text-xl mb-8">Add New Product</h3>


            <form onSubmit={addProduct} className='space-y-6'>
                <div className='grid gap-6'>
                    {/* name input */}
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Product Name</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                                <Package2 className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            // name='name' 
                            placeholder='Type product name' 
                            className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200' 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* price input */}
                     <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Price</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                                 <DollarSign className='w-5 h-5' />
                            </div>
                            <input 
                            type="number" 
                            // name='name' 
                            min="0"
                            step="0.01"
                            placeholder='0.00' 
                            className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200' 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                             />
                        </div>
                    </div>
                    {/* image input */}
                     <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Image URL</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                                <Image className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            // name='name' 
                            placeholder='https://example.com/image.jpg' 
                            className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200' 
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
                 {/* modal Actions */}
          <div className='modal-action'>
            <form method="dialog">
                <button className='btn btn-ghost'>cancel</button>
            </form>
            <button 
            type='submit' 
            className='btn btn-primary min-w-[120px]'
            disabled={!formData.name || !formData.price || !formData.image|| loading}
            >
                {loading ? (
                    <span className='loading loading-spinner loading-sm' />
                ) : ( <>
                    <PlusCircle className='w-5 h-5 mr-2' />
                    Add
                    </>
                )}
            </button>
        
        </div>
            </form>
        </div>
        {/* backdrop */}
       
        <form method="dialog" className='modal-backdrop'>
            <button>close</button>
        </form>
    </dialog>
  )
}

export default AddProductModel;