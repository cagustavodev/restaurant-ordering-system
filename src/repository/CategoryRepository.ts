import supabase from "../config/supabase.js";
import { Category } from "../models/Category.js"

// ===============
//find all the data on supabase - GET
// ===============

async function findAll() {
    const { data, error } = await supabase
    .from("categories")
    .select("*");

    if(error){
        throw error;
    }

    return data;
}


// ===============
// find by id - GET
// ===============

async function findById(id: string) : Promise<Category> {
    const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id",id)
    .single();

    if(error){
        throw error;
    }

    return Category.restore(
        data.id,
        data.name,
        data.display_order,
        data.active,
        data.description,
        data.icon
    );
}


// ===============
// create a new item on category - POST
// ===============

async function create(category: Category) {
    const { data, error } = await supabase
        .from("categories")
        .insert({
            name: category.getName(),
            description: category.getDescription(),
            icon: category.getIcon(),
            display_order: category.getDisplayOrder(),
            active: category.isActive()
        })
        .select()
        .single();
        
    if (error){
        throw error;
    }

    return data;
}


// ===============
// update of the data - UPDATE
// ===============

async function update(category: Category) {
    const id = category.getId();
    const { data, error } = await supabase
        .from("categories")
        .update({
            name: category.getName(),
            description: category.getDescription(),
            icon: category.getIcon(),
            display_order: category.getDisplayOrder(),
            active: category.isActive
        })
        .eq("id",id)
        .select()
        .single();
        
    if (error){
        throw error;
    }

    return data;
}


// ===============
// delete of the data - UPDATE
// ===============

async function remove(id: string) {
    const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id",id)
    .single();

    if(error){
        throw error;
    }

    return data;
}


async function searchByKeyword(Keyword: string){
    const { data, error } = await supabase
    .from("categories")
    .select("*")
    .or(`name.ilike.%${Keyword}%,description.ilike.%${Keyword}%`)
    .order("display_order", { ascending: true});
     //% concatena e ${} pega o valor de uma variavel

    if(error){
        throw error;
    }
    return data;
}

// ===============
// export the data 
// ===============

export default{
    findAll, //puxa tudo
    findById,
    create,
    update,
    remove,
    searchByKeyword
}