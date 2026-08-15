import express from "express";

const app = express();

const categories = [
    {
        "id": 1,
        "name": "Pizzas",
        "description": "Pizzas salgadas com diversos sabores, ingredientes e tamanhos."
    },
    {
        "id": 2,
        "name": "Bebidas",
        "description": "Bebidas para acompanhar a pizza, incluindo refrigerantes, sucos e água."
    },
    {
        "id": 3,
        "name": "Sobremesas",
        "description": "Opções doces para finalizar a refeição, como pizzas doces e sobremesas."
    }
];

const products = [
    {
        "id": 1,
        "categoryId": 1,
        "name": "Pizza Calabresa",
        "description": "Molho de tomate, mussarela, calabresa fatiada, cebola e orégano.",
        "price": 45.90
    },
    {
        "id": 2,
        "categoryId": 1,
        "name": "Pizza Frango com Catupiry",
        "description": "Molho de tomate, mussarela, frango desfiado, catupiry e orégano.",
        "price": 49.90
    },
    {
        "id": 3,
        "categoryId": 2,
        "name": "Refrigerante Coca-Cola 2L",
        "description": "Refrigerante Coca-Cola tradicional em garrafa de 2 litros.",
        "price": 12.00
    },
    {
        "id": 4,
        "categoryId": 3,
        "name": "Pizza de Chocolate",
        "description": "Pizza doce com chocolate cremoso e granulado.",
        "price": 42.90
    }
]

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API restaurante",
        version: "1.0.0"
    });
});

app.get("/categories", (req, res) => {
    res.status(200).json(categories);
});

app.get("/products", (req, res) => {
    res.status(200).json(products);
});
export default app;