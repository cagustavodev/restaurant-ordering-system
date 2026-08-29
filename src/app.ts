import express from "express";
import { randomUUID } from "node:crypto";
import supabase from "./config/supabase.js";


const app = express();

app.use(express.json());

const pizzaCategoryId = randomUUID();
const drinksCategoryId = randomUUID();

//=============
//initial date
//=============

const categories = [
    {
        "id": pizzaCategoryId,
        "name": "Pizzas",
        "description": "Pizzas salgadas com diversos sabores, ingredientes e tamanhos."
    },
    {
        "id": drinksCategoryId,
        "name": "Bebidas",
        "description": "Bebidas para acompanhar a pizza, incluindo refrigerantes, sucos e água."
    },
];

const products = [
    {
        "id": randomUUID(),
        "categoryId": pizzaCategoryId,
        "name": "Pizza Calabresa",
        "description": "Molho de tomate, mussarela, calabresa fatiada, cebola e orégano.",
        "price": 45.90
    },
    {
        "id": randomUUID(),
        "categoryId": pizzaCategoryId,
        "name": "Pizza Frango com Catupiry",
        "description": "Molho de tomate, mussarela, frango desfiado, catupiry e orégano.",
        "price": 49.90
    },
    {
        "id": randomUUID(),
        "categoryId": drinksCategoryId,
        "name": "Refrigerante Coca-Cola 2L",
        "description": "Refrigerante Coca-Cola tradicional em garrafa de 2 litros.",
        "price": 12.00
    },
    {
        "id": randomUUID(),
        "categoryId": pizzaCategoryId,
        "name": "Pizza de Chocolate",
        "description": "Pizza doce com chocolate cremoso e granulado.",
        "price": 42.90
    }
]

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
//categories
//=============

app.get("/categories", (req, res) => {
    res.status(200).json(categories); // 200 é para GET, receber
});

//=============
//categories by id
//=============

app.get("/categories/:id", (req, res) => {
    const category = categories.find((category) => {
        return category.id == req.params.id;
    });

    if(!category){
        return res.status(404).json({ // 404 = error
            message: "Categoria não encontrada"
        });
    }

    res.status(200).json(category); 
});

//=============
//post categories
//=============

app.post("/categories", (req, res) => {
    const category = {
        id: randomUUID(),
        ...req.body,
    };
    
    categories.push(category);
    
    res.status(201).json(category); //201 é para POST, receber, no postman tem que salvar tudo 
});

//=============
//put/update categories
//=============

//put = update
app.put("/categories/:id", (req, res) => {
    const category = categories.find((category) => {
        return category.id == req.params.id;
    });

    if(!category){
        return res.status(404).json({ // 404 = error
            message: "Categoria não encontrada"
        });
    }

    category.name = req.body.name;
    category.description = req.body.description;

    res.status(200).json(category); 
});

//=============
//delete categories
//=============

app.delete("/categories/:id", (req, res) => {
    const category = categories.find((category) => {
        return category.id == req.params.id;
    });

    if(!category){
        return res.status(404).json({ // 404 = error
            message: "Categoria não encontrada"
        });
    }

    const index = categories.indexOf(category);
    categories.splice(index,1) //numero de elementos a remover

    res.status(200).json({
        message: "Categoria removida com sucesso "
    }); 
});

//====================================
//PRODUCTS
//====================================

//============
// products get and post
//============
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

app.post("/products", (req, res) => {
    const product = {
        id: randomUUID(),
        ...req.body,
    };
    products.push(product);
    res.status(201).json(product); //201 é para POST, receber, no postman tem que salvar tudo 
});

//===============
//products by id
//===============

app.get("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product){
        return res.status(404).json({
            message: "Product não encontrada"
        });
    }

    res.status(200).json(product); 
});

//===============
//products update
//===============

app.put("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product){
        return res.status(404).json({ // 404 = error
            message: "Produto não encontrada"
        });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.categoryId = req.body.categoryId;

    res.status(200).json(product); 
});

//===============
//products delete
//===============

app.delete("/products/:id", (req, res) => {
    const product = products.find((product) => {
        return product.id == req.params.id;
    });

    if(!product){
        return res.status(404).json({ // 404 = error
            message: "Produto não encontrado"
        });
    }

    const index = products.indexOf(product);
    products.splice(index,1) //numero de elementos a remover

    res.status(200).json({
        message: "Produto removido com sucesso "
    }); 
});

//============
// supabase
//============
app.get("/test-supabase", async(req, res) => {
    const { data, error } = await supabase
    .from("categorias")
    .select("*");

    if(error){
        console.log("Erro ao consultar Supabase", error);

        return res.status(500).json({
            success: false,
            message: "erro ao consultar o banco de dados",
            error: error.message,
        });
    }

    res.status(200).json({
        success: true,
        message: "Conexão com supabase realizada com sucesso",
        data,
    });
});

export default app;