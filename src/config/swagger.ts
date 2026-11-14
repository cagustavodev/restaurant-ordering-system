// ====================================================================
// criando documentação com swagger da blackboard 
// para conhecer melhor acessar a documentação, pesquisar na internet
// ====================================================================

import swaggerJSDoc from "swagger-jsdoc";
import { Category } from "../models/Category.js";

const options : swaggerJSDoc.Options = {

    definition: {
        openapi: "3.0.3",

        info: {
            title: "Restaurant Ordering System API",
            version: "1.0.0",
            description: "API REST para gerenciamento de cateforias e produtos de um sistema de pedidos de restaurante.",
        },

        servers: [
            {
                url: "http://localhost:3000",
                descripion: "Development server",
            },
        ],

        tags: [
            {
                name: "Categories",
                description: "Gerenciamento de categorias",
            },
            {
                name: "Products",
                description: "Gerenciamento de produtos",
            },
        ],

        components: {
            schemas: {
                Category: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "e8c9a25a-f7b4-4649-af9d-06190ead2362"
                        },
                        name: {
                            type: "string",
                            example: "pizza"
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais"
                        },
                        icon: {
                            type: "string",
                            nullable: true,
                            example: "🍕",
                        },
                        disply_order: {
                            type: "integer",
                            minimum: 0,
                            example: "1"
                        },
                        active: {
                            type: "boolean",
                            example: true,
                        },
                    },
                },


                CreateCategory:{
                    type: "object",
                    required: ["name", "display_order"],
                    properties: {
                        name: {
                            type: "string",
                            minLength: 1,
                            example: "Pizza",
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais"
                        },
                        icon: {
                            type: "string",
                            example: "🍕",
                        },
                        disply_order: {
                            type: "integer",
                            minimum: 0,
                            example: "1"
                        },
                    }
                },


                UpdateCategory:{
                    type: "object",
                    required: ["name", "display_order"],
                    properties: {
                        name: {
                            type: "string",
                            minLength: 1,
                            example: "Pizza",
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais"
                        },
                        icon: {
                            type: "string",
                            example: "🍕",
                        },
                        disply_order: {
                            type: "integer",
                            minimum: 0,
                            example: "1"
                        },
                    }
                },

                
                ErrorCategory:{
                    type: "object",
                    required: ["name", "display_order"],
                    properties: {
                        message: {
                            type: "string",
                            example: "Erro ao processar a solicitação"
                        },
                    }
                },
            }
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;


// anotações:
// isso cria uma pagina só para mostrar as informações sobre o sistema que foram configuradas acima
//