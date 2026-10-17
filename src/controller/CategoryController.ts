import type { Request, Response } from "express"; //permite fazer requisições e obter respostas
import CategoryRepository from "../repository/CategoryRepository.js"; 
import { Category } from "../models/Category.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
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

//função GET BY KEYWORD
async function getByKeyword(req: Request <{ Keyword:string }>, res: Response) {
    const { Keyword } = req.params;

    if(!Keyword || typeof Keyword != "string"){ //teste se palavra != string
        return res.status(400).json({ 
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

//função GET BY ID
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
        console.error("Erro ao buscar categoria: ", error);
    
        if(error instanceof NotFoundError) // erro do tipo NotFound
            res.status(404).json({ //404 = não encontrado
                message: error.message, //já tá padronizado a mensagem
        });
    
        res.status(500).json({
            message: "Erro interno ao buscar categoria",
        });
    }
}

//função POST
async function create(req: Request, res: Response){ 
    const {name, display_order, description, icon } = req.body

    try{
        const category = new Category(name, display_order, description, icon);

        const createdCategory = await CategoryRepository.create(category);

        return res.status(201).json(createdCategory);
    }catch (error){
        console.error("Erro ao criar categoria: ", error);

        if(error instanceof ValidationError) { // erro do tipo ValidationError identificado pelo instanceof
            return res.status(400).json({
                message: error.message,
            })
        }

        res.status(500).json({
            message: "Erro interno ao criar categoria",
        })
    }
}

// função PUT
async function update(req: Request <{id: string}>, res:Response){
    const { id } = req.params;
    const {name, display_order, description, icon, active } = req.body

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID da Categoria não informado."
        });
    }

    try{
        const category = await CategoryRepository.findById(id);

        //validações
        // /se recebi ok, senão tambem ok. Busca reduzir a fila de informações que são afetadas

        if(name !== undefined){
            category.rename(name);
        }
        if(description !== undefined){
            category.changeDescription(description);
        }
        if(icon !== undefined){
            category.changeIcon(icon);
        }
        if(display_order !== undefined){
            category.changeDisplayOrder(display_order);
        }
        if(active !== true){
            category.activate;
        }
        if(active !== false){
            category.deactivate;
        }

        const updateCategory = await CategoryRepository.update(category);
    
        res.status(200).json(updateCategory);
    }catch (error){
        console.error("Erro ao atualizar categoria: ", error);

        if(error instanceof ValidationError) { // erro do tipo ValidationError identificado pelo instanceof
            return res.status(400).json({ // 400 = erro conhecido
                message: error.message,
            });
        }
    
        if(error instanceof NotFoundError) // erro do tipo NotFound
            res.status(404).json({ //404 = não encontrado
                message: error.message,
        });

        res.status(500).json({ // 500 = erro global
            message: "Erro interno ao atualizar categoria",
        });
    }
}

//função DELETE
async function remove(req: Request <{id: string}>, res:Response){
    const { id } = req.params;

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID da Categoria não informado."
        })
    }

    try{
        await CategoryRepository.remove(id);
    
        res.status(200).json({
            message: "Categoria removida com sucesso"
        });
    }catch (error){
        console.error("Erro ao remover categoria: ", error);

        if(error instanceof NotFoundError) // erro do tipo NotFound
            res.status(404).json({ //404 = não encontrado
                message: error.message, //já tá padronizado a mensagem
        });
    
        res.status(500).json({
            message: "Erro interno ao remover categoria",
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