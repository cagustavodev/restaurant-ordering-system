import { Router } from "express";
import CategoryController from "../controller/CategoryController.js";

const router = Router();

//Category Routes

router.get("/", CategoryController.getAll); //faz o get

router.get("/search/:Keyword", CategoryController.getByKeyword); // faz o get das keywords

router.get("/:id", CategoryController.getById); //faz o get dos id

router.post("/", CategoryController.create) //faz a criação de uma categoria

router.put("/:id", CategoryController.update); //faz o update de uma categoria

router.delete("/:id",  CategoryController.remove) // faz o remove de uma categoria

export default router;

// pega de category as functions e joga na category controller e define esse processo como rota