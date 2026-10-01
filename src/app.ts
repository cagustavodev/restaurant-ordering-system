import express from "express";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import categoryRoutes from "./routes/categoryRoutes.js" // app recebe a rota e joga no server
import productRoutes from "./routes/productRoutes.js" // app recee a rota e joga no server


const app = express();

app.use(express.json());

//status:
// 200 = sucesso
// 500 = erro 
// 404 = não encontrado

//toda vez que mudar de maquina readicionar o env

//=============
//root
//=============

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API restaurante",
        version: "1.0.0"
    });
});

//=============
//categories - Process of GET, POST, UPDATE and DELETE
//=============

app.use("/categories", categoryRoutes);

// app.post("/categories", async (req,res) => {
// });

// app.get("/categories/:id", async (req,res) => {    
// });

// app.put("/categories/:id", async (req,res) => {
// });

// app.delete("/categories/:id", async (req,res) => {
// });

//====================================
//PRODUCTS
//====================================

app.use("/products", productRoutes)

// app.get("/products", async (req,res) => {
// });

// keyword feito

// app.get("/products/:id", async (req,res) => {
// })

// app.post("/products/", async (req,res) => {
// })

// app.put("/products/:id", async (req, res) => {
// });

// app.delete("/products/:id", async (req, res) => {
// });

export default app;