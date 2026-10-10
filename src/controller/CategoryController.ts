import type { Request, Response } from "express"; //permite fazer requisições e obter respostas
import CategoryRepository from "../repository/CategoryRepository.js"; 
import { Category } from "../models/Category.js";
// recebe a categoria do repositorio que contem o formato da categoria

//função GET
async function getAll(req: Request, res: Response){ 
    try{
        const categories = await CategoryRepository.findAll();
    
        res.status(200).json(categories);
    }catch (error){
        console.error("Erro ao buscar categorias: ", error);
    
        res.status(500).json({
            message: "Erro ao buscar categorias",
        })
    }
}


async function getByKeyword(req: Request <{ Keyword:string }>, res: Response) {
    const { Keyword } = req.params;

    if(!Keyword || typeof Keyword != "string"){ //teste se palavra != string
        res.status(400).json({ 
            message:"palavra-chave não informada."
        })
    }

    try{
        const categories = await CategoryRepository.searchByKeyword(Keyword);
        res.status(200).json(categories)
        
    }catch (error) {
        console.error("Erro ao pesquisar por categoria: ", error);

        res.status(500).json({
            message: "Erro ao pesquisar categoria.", 
        })
    }
    
}


async function getById(req: Request <{id: string}>, res:Response){
    const { id } = req.params;

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID da Categoria não informado."
        })
    }

    try{
        const category = await CategoryRepository.findById(
            req.params.id
        );
    
        res.status(200).json({
            id: category.getId(),
            name: category.getName(),
            description: category.getDescription(),
            icon: category.getIcon(),
            display_order: category.getDisplayOrder(),
            active: category.isActive()
        });
    }catch (error){
        console.error("Erro ao consultar categoria: ", error);
    
        res.status(404).json({
            message: "Categoria não encontrada",
        });
    }
}


async function create(req: Request, res: Response){ 
    const {name, display_order, description, icon } = req.body
    try{
        const category = new Category(name, display_order, description, icon);
        const createdCategory = await CategoryRepository.create(category);

        res.status(200).json(createdCategory);

    }catch (error){
        console.error("Erro ao criar categoria: ", error);

        res.status(500).json({
            message: "Erro ao criar categoria",
        })
    }
}


async function update(req: Request <{id: string}>, res:Response){
    const { id } = req.params;
    const {name, display_order, description, icon } = req.body

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID da Categoria não informado."
        })
    }

    try{
        const category = await CategoryRepository.findById(id);

        //criar validações
        const updatedCategory = await CategoryRepository.update(category);
    
        res.status(200).json(updatedCategory);
    }catch (error){
        console.error("Erro ao atualizar categoria: ", error);
    
        res.status(500).json({
            message: "Erro ao atualizar categoria",
        });
    }
}


async function remove(req: Request <{id: string}>, res:Response){
    const { id } = req.params;

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID da Categoria não informado."
        })
    }

    try{
        const category = await CategoryRepository.remove(id);
    
        res.status(200).json({
            message: "Categoria removida com sucesso"
        });
    }catch (error){
        console.error("Erro ao remover categoria: ", error);
    
        res.status(500).json({
            message: "Erro ao remover categoria",
        });
    }
}

export default{
    getAll,
    getById,
    getByKeyword,
    create,
    update,
    remove,
}

//controller controla toda a entrada de dados do usuario e 