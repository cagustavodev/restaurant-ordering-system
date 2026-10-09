import supabase from "../config/supabase.js";
import type { Category } from "../models/Category.js"

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

async function findById(id: string) {
    const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id",id)
    .single();

    if(error){
        throw error;
    }

    return data;
}


// ===============
// create a new item on category - POST
// ===============

async function create(category: Category) {
    const { data, error } = await supabase
        .from("categories")
        .insert(category)
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

async function update(id: string ,category: Category) {
    const { data, error } = await supabase
        .from("categories")
        .update(category)
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