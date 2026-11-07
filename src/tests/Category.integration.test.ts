import { randomUUID } from "node:crypto";
import { afterEach, describe, it, expect } from "vitest";
import request from "supertest"
import app from "../app.js";
import supabase from "../config/supabase.js";

describe ("Category - Testes Unitários", () => {
    const testNames: string[] = [];

    function makeCategoryData(){
        const name = `Teste integração ${randomUUID()}`; // numero do teste

        testNames.push(name); //adiciona o nome do teste

        return{
            name,
            display_order: 1,
            description: "categoria criada pelo teste de integração",
            icon: "🍕",
            // active: true,
            // created_at: new Date() ,
            // updated_at: new Date()

        };
    }

    async function createCategory() { // função faz categoria
        const data = makeCategoryData();

        const response = await request(app).post("/categories").send(data); //aguarda o post e recebe a data
        expect(response.status).toBe(201); //tudo certo no create
        expect(response.body.id).toEqual(expect.any(String)); // id = string
        return{
            id:response.body.id as string,
            data,
        };
    }

    afterEach(async () => {
        const names = testNames.splice(0);
        if(names.length === 0 ){
            return;
        }
        const { error } = await supabase
            .from("categories")
            .delete()
            .in("name",names);

        if (error) {
            throw new Error(`Falha ao limpar categorias do teste: ${error.message}`);
        }
    },20_000);
    
    it("deve criar uma categoria valida", async () => {

    const data = makeCategoryData();

    const response = await request(app).post("/categories").send(data);

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body).toMatchObject({
        ...data, // traz todos os dados
        // active: true,
        });
    });

    //GET
    it("deve listar as categorias incluindo a categoria criada", async () => {
        const { id, data } = await createCategory();

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id, 
                    name: data.name
                }),            
            ]),
        );
    }, 20_000);

    // GET BY ID
    it("deve consultar uma categoria existente por ID", async () => {
        const { id, data } = await createCategory();

        const response = await request(app).get(`/categories/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id, 
            ...data,
            active: true,
        });         
    }, 20_000);


    // get by keyword
    it("deve buscar uma categoria por palavra-chave", async () => {
        const { id, data } = await createCategory();

        const response = await request(app)
        .get(`/categories/search/${data.name}`)
        .query({ keyword: data.name})

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id, 
                    name: data.name
                }),            
            ]),
        );
    }, 20_000);


    it("deve consultar uma categoria existente por ID", async () => {
        const { id, } = await createCategory();
        const response = await request(app).delete(`/categories/${id}`);

        const { data, error} = await supabase
            .from("categories")
            .select("id")
            .eq("id",id)
            .maybeSingle();
            
        expect(error).toBeNull();
        expect(data).toBeNull();
        expect(response.status).toBe(200);
    }, 20_000);
});





