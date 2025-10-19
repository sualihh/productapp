import db from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await db.query("SELECT * FROM  products ORDER BY created_at DESc");
        console.log("fetched products");
        res.status(200).json({success: true, data: products.rows})
    } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createProduct = async (req, res) => {
    console.log("req.body:", req.body); // add this line to see what you receive
    const { name, price, image} = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({success:false, message: "please full all field"})
    }
    try {
        const newProduct = await db.query(
            "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
            [name, price, image]
    );

        console.log("product created", newProduct)
        res.status(200).json({success: true, data: newProduct.rows[0]})

    } catch (error) {
    console.error("Error creating products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
       const product = await db.query("SELECT * FROM products WHERE id = $1", [id]);
        res.status(200).json({success: true, data: product[0]})

    } catch (error) {
        
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, image} = req.body;
     try {
        const updateProduct = await db.query(
            "UPDATE products SET name = $1, price =$2, image = $3 WHERE id = $4 RETURNING *",
            [name, price, image, id]
        )

        if (updateProduct.length === 0) {
        res.status(404).json({ success: false, message: "product not found" });
        }

        res.status(200).json({success: true, data: updateProduct.rows[0]})
        
     } catch (error) {
        console.log("error updating product", error);
        res.status(500).json({ success: false, message: "Server Error" });
     }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await db.query("DELETE FROM products WHERE id = $1", [id])
        res.status(200).json({success: true, data: deleteProduct.rows[0]})
   
        if (deleteProduct.length === 0) {
        res.status(404).json({ success: false, message: "product not found" });
        }

    } catch (error) {
         console.log("error delete product", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
