import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import path from "path";



import productRoutes from "./routes/productRoutes.js"


dotenv.config();

db.connect();

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());// helmet is a security middleware that helps you protrct your app by setting various http headers
app.use(morgan("dev"));// log  requests






app.use("/api/products", productRoutes)






// production
if (process.env.NODE_ENV === "production") {
  // adjust folder name if using CRA: "build" instead of "dist"
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}




async function initDB() {
    try {

         await db.query(
        "CREATE TABLE IF NOT EXISTS products (  id SERIAL PRIMARY KEY,  name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
         );
    } catch (error) {
        console.log("error in initializig database", error)
    }
}



initDB().then(() => {
    app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
})