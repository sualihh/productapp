import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const BASE_URL = import.meta.env.MODE === "development"?"http://localhost:3000" :"";
export const useProductStore = create((set, get) => ({
    //product
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    //form state
    formData: {
        name:"",
        price: "",
        image: "", 
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({formData: {name:"", price:"", image:""}}),

    addProduct: async (e) => {
        e.preventDefault();
        set({loading:true});
        console.log("product", e);
        
        try {
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("product added");
            document.getElementById("add_product_modal").close();
        } catch (error) {
            console.log("error to add product ", error);
            toast.error("something wrong")
        } finally {
            set({loading:false});
        }
    },


    fetchProducts: async () => {
        set({ loading: true });

        try {
            const response =  await axios.get(`${BASE_URL}/api/products`)
            set({products: response.data.data, error: null});
        } catch (err) {
            if (err.status == 429) set({error: "Too many requests, please try again later."});
            else set({error:"An error occurred while fetching products."});
        } finally {
            set({ loading: false });
    
    }
    } ,
    
    deleteProduct: async (id) => {
        console.log("delete product", id);
        
       set({loading:true});
       try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        set(prev => ({products:prev.products.filter(product => product.id !== id)}))
        toast.success("product deleted")
       } catch (error) {
        console.log("error to delete ", error);
        toast.error("something wrong")
       }
       finally {
        set({loading:false});
       }
},

    fetchProduct: async (id) => {
        set({ loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);

            set({ currentProduct: response.data.data,
                formData: response.data.data,//prefill form with current product data 
                error: null,
            });

        } catch (error) {
            console.log("error in feathproduct function", error);
            
        } finally {
            set({loading: false})
        }
    },

    updateProduct: async (id) => {
        set({loading: true});
        try {
            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({ product: response.data.data,});
            toast.success("product updated");
        } catch (error) {
            console.log("something wrong");
            toast.error("something wrong");
            
        } finally {
            set({loading: false});
        }
    }
}))