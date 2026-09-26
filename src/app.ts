import express from "express";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import categoryRoutes from "./routes/categoryRoutes.js"


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

app.use("/categories", categoryRoutes)

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

app.get("/products", async (req,res) => {
    try{
        const products = await Product.findAll();
        res.status(200).json(products);

    }catch (error){
        console.error("Erro ao buscar produtos: ", error);

        res.status(500).json({
            message: "Erro ao buscar produtos",
        })
    }
});

app.get("/products/:id", async (req,res) => {
    try{
        const products = await Product.findById(
        req.params.id
        );
        res.status(200).json(products);
    }catch (error){
        console.error("Erro ao consultar o produto", error);

        res.status(500).json({
            message: "Erro ao consultar o produto"
        })
    }
})


app.post("/products/", async (req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch (error){
        console.error("Erro ao criar produto: ", error);

        res.status(500).json({
            message: "Erro ao criar produto",
        })
    }
})


app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.update(id, req.body);

        res.json(product);
    } catch (error) {
        console.log("Erro ao atualizar produto: ", error);
        res.status(500).json({ message: "Erro ao atualizar produto" });
    }
});


app.delete("/products/:id", async (req, res) => {
    try {
        await Product.remove(
            req.params.id
        );

        res.status(200).json({
            message: "Produto removido com sucesso"
        });
    } catch (error) {
        console.error("Erro ao remover produto: ", error);

        res.status(404).json({
            message: "Produto não encontrado",
        });
    }
});

//pronto


export default app;