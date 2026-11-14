import { Router } from "express";
import CategoryController from "../controller/CategoryController.js";

const router = Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: listar todas as categorias
 *     description: Retorna todas as categorias cadastradas
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro interno ao buscar categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

//Category Routes

router.get("/", CategoryController.getAll); //faz o get]

/**
 * @openapi
 * /categories/search:
 *   get:
 *     tags: 
 *       - Categories
 *     summary: Buscar categorias por palavras chaves
 *     description: Retorna categorias com base em uma palavra chave
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: palavra-chave utilizada na pesquisa
 *         schema:
 *           type: string
 *           example: pizza
 *     responses:
 *       200:
 *         description: Categorias encontradas com sucesso.
 *         
 *       500:
 *         description: Erro interno ao buscar categorias.
 */

router.get("/search/keyword", CategoryController.getByKeyword);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags: 
 *       - Categories
 *     summary: Buscar categorias por ID
 *     description: Retorna categoria esoecidica pelo seu identificador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontradas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/Error'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno ao buscar categorias.
 */

router.get("/:id", CategoryController.getById); 

/**
 * @openapi
 * /categories:
 *   post:
 *     tags: 
 *       - Categories
 *     summary: Criar uma categoria
 *     description: Cadastrar uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: dados invalidos.
 *       500:
 *         description: Erro interno ao criar categoria.
 */

router.post("/", CategoryController.create) //faz a criação de uma categoria

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     tags: 
 *       - Categories
 *     summary: atualizar uma categoria
 *     description: atualiza os dados de uma categoria existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       400:
 *         description: Dados invalidos
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno ao atualizar categoria.
 */

router.put("/:id", CategoryController.update); //faz o update de uma categoria

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags: 
 *       - Categories
 *     summary: Remover uma categoria
 *     description: Remove uma categoria pelo seu identificador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso.
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno ao remover categoria.
 */

router.delete("/:id",  CategoryController.remove);

export default router;

// pega de category as functions e joga na category controller e define esse processo como rota