import type { Request, Response } from "express"; //permite fazer requisições e obter respostas
import Product from "../models/Product.js"; //recebe o produto de product.js, porque js?

// =================
// function GET
// =================

async function getAll (req: Request, res: Response){
    try{
        const products = await Product.findAll();
        res.status(200).json(products);
    
    }catch (error){
        console.error("Erro ao buscar produtos: ", error);
    
        res.status(500).json({
            message: "Erro ao buscar produtos",
        })
    }
}

// =================
// function GET by keyword
// =================

async function getByKeyword(req: Request <{ Keyword:string }>, res: Response) {
    const { Keyword } = req.params;

    if(!Keyword || typeof Keyword != "string"){ //teste se palavra != string
        res.status(400).json({ 
            message:"palavra-chave não informada."
        })
    }

    try{
        const products = await Product.searchByKeyword(Keyword);
        res.status(200).json(products)
        
    }catch (error) {
        console.error("Erro ao pesquisar por produto: ", error);

        res.status(500).json({
            message: "Erro ao pesquisar produto.", 
        })
    }
    
}


async function getById (req: Request <{id:string}>, res: Response){
    const {id} = req.params;

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID do produto não informado."
        })
    }
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
};

async function create(req: Request, res: Response){
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch (error){
        console.error("Erro ao criar produto: ", error);

        res.status(500).json({
            message: "Erro ao criar produto",
        })
    }
}


async function update(req: Request <{id: string}>, res:Response){
    const { id } = req.params;

    if(!id){ // se não tiver id informado dá erro
        res.status(404).json({
            message: "ID do produto não informado."
        })
    }
    try {
        const { id } = req.params;
        const product = await Product.update(id, req.body);
    
        res.json(product);
    } catch (error) {
        console.log("Erro ao atualizar produto: ", error);
        
    res.status(500).json({ message: "Erro ao atualizar produto" });
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
        const category = await Product.remove(id);
    
        res.status(200).json({
            message: "Produto removido com sucesso"
        });
    }catch (error){
        console.error("Erro ao remover produto: ", error);
    
        res.status(500).json({
            message: "Erro ao remover produto",
        });
    }
}


export default{
    getAll,
    getByKeyword,
    getById,
    create,
    update,
    remove
}