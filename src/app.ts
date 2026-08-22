import express from "express";
import { randomUUID } from "node:crypto";


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
        return res.status(404).json({
            message: "Categoria não encontrada"
        });
    }

    res.status(200).json(category); 
});

app.post("/categories", (req, res) => {
    const category = {
        id: randomUUID(),
        ...req.body,
    }
    
    categories.push(category);
    
    res.status(201).json(category); //201 é para POST, receber, no postman tem que salvar tudo 
});

//============
// products
//============

app.get("/products", (req, res) => {
    res.status(200).json(products);
});

app.post("/products", (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).json(product); //201 é para POST, receber, no postman tem que salvar tudo 
});

export default app;