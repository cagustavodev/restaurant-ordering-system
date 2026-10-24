import { describe, it, expect } from "vitest";
import { Category } from "../models/Category.js";

//descrição do teste = describe
describe ("Category - Testes Unitários", () => {
    //oque deve acontecer? = it
    it("deve criar uma categoria valida", () => {

        //dados que são repassados para testar
        const name = "Pizzas";
        const display_order = 1;
        const description = "Categoria de pizzas";
        const icon = "🍕";

        //a categoria tem esses atributos no metodo construtor(model)
        const category = new Category(
            name,
            display_order,
            description,
            icon
        );

        //Oque é esperado ao realizar o teste, se der erro aparece na linha
        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.getDescription()).toBe("Categoria de pizzas");
        expect(category.getIcon()).toBe("🍕");
        expect(category.isActive()).toBe(true); // tem que estar verdadeiro
        expect(category.getId()).toBeUndefined; //não dá pra descrever
    });


    it("não deve permitir criar uma categoria com o nome vazio", () => {

        //dados que são repassados para testar
        const name = "";
        const display_order = 1;
    
        //Oque é esperado ao realizar o teste, se não tiver nome:
        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.")
    });


    it("não deve permitir ordem de exibição negativa", () => {

        //dados que são repassados para testar
        const name = "Pizzas";
        const display_order = -1;
    
        //Oque é esperado ao realizar o teste, se tiver d_o = - algo:
        expect(() => {
            new Category(name, display_order);
        }).toThrow(
            "A ordem de exibição deve ser um número inteiro maior ou igual a zero."
        );
    });


    it("deve remover espaços antes e depois do nome da categoria", () => {

        //dados que são repassados para testar
        const name = "           Pizzas          "; // trim() é usado para limpeza
        const display_order = 1;

        const category = new Category(name, display_order); 
        //precisa do name e do display_order sempre! pois é validado na classe Category

        //Oque é esperado ao realizar o teste
        expect(category.getName()).toBe("Pizzas");
    });


    it("Não deve remover permitir criar uma categoria com nome contendo apenas espaços", () => {

        //dados que são repassados para testar
        const name = "                   "; // trim() é usado para limpeza
        const display_order = 1;

        //resultado esperado:
        expect(() => {
            new Category(name, display_order); // nova categoria com esses atributos
        }).toThrow("O nome da categoria é obrigatório.");
    });


    it("não deve permitir ordem de exibição decimal", () => {

        //dados que são repassados para testar
        const name = "Pizzas";
        const display_order = 1.5;
    
        //Oque é esperado ao realizar o teste, se tiver d_o = - algo:
        expect(() => {
            new Category(name, display_order);
        }).toThrow(
            "A ordem de exibição deve ser um número inteiro maior ou igual a zero."
        );
    });


    it("não deve permitir ordem de exibição igual a 0", () => {

        //dados que são repassados para testar
        const name = "Pizzas";
        const display_order = 0;
    
        //Oque é esperado ao realizar o teste
        const category = new Category(name, display_order); 
        //precisa do name e do display_order sempre! pois é validado na classe Category

        //Oque é esperado ao realizar o teste
        expect(category.getDisplayOrder()).toBe(0);
    });


    it("não deve permitir renomear a uma categoria existente", () => {
        //outra forma
        const category = new Category("Pizzas", 1); 

        category.rename("Bebidas");
        //Oque é esperado ao realizar o teste
        expect(category.getName()).toBe("Bebidas");
    });


    it("deve preservar o nome original após uma tentativa invalida de renomeação", () => {
        //outra forma
        const category = new Category("Pizzas", 1); 

        expect(() => {
            category.rename("");
        }).toThrow( "O nome da categoria é obrigatório.");

        expect(category.getName()).toBe("Pizzas");
    });


    it("não deve permitir desativar e reativar uma categoria", () => {

        const category = new Category("Pizzas", 1); 
        category.deactivate();

        expect(category.isActive()).toBe(false);
        category.activate();

        expect(category.isActive()).toBe(true);
    });


    it("deve restaurar uma categoria existente", () => {

        const id = "750a0251-c709-4712-b86c-5d00dcd5156f";
        const name = "Pizzas";
        const display_order = 1;
        const active = false;
        const description = "Categoria de pizzas";
        const icon = "🍕";

        const category = Category.restore(
            id,
            name,
            display_order,
            active,
            description,
            icon
        );

        expect(category.getId()).toBe(id);
        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.isActive()).toBe(false); // tem que estar falso
        expect(category.getDescription()).toBe("Categoria de pizzas");
        expect(category.getIcon()).toBe("🍕");
    });


    it("deve permitir alterar uma descrição de uma categoria", () => {

        const name = "Pizzas";
        const display_order = 1;
        const description = "Categoria de pizzas tradicionais";

        const category = new Category(
            name,
            display_order,
            description,
        );

        category.changeDescription("Categoria de pizzas tradicionais e especiais")

        expect(category.getDescription()).toBe("Categoria de pizzas tradicionais e especiais");
    });


    //método simplificado de definição do teste
    it("deve permitir alterar um icone de uma categoria", () => {

        const category = new Category( "Pizzas", 1, "Categoria de pizzas tradicionais", "🍕");
        category.changeIcon("🥤")

        expect(category.getIcon()).toBe("🥤");
    });


    it("deve permitir alterar a ordem de exibição de uma categoria", () => {

        const category = new Category( "Pizzas", 1,);
        category.changeDisplayOrder(2)

        expect(category.getDisplayOrder()).toBe(2);
    });

});


// ANOTAÇÕES:
// () => tudo dentro do bloco é automaticamente executado
// TDD = test driven development = escreve um teste automatizado antes do código 
// casa do código = site para pesquisar sobre TDD 

//  esse teste valida o comportamento do sistema, o postman serve para relação
//com o banco de dados

// sempre todos os testes ficam dentro do describe que é avaliado, no it fica 
//a situação do teste com os detalhes e dentro dele o expect que valida o teste

// const category = new Category(name, display_order); 
//precisa do name e do display_order sempre! pois é validado na classe Category

// para testar: npm run test em outro terminal de prompt de comando para testes