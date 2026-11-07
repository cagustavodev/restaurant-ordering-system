import { describe, it, expect } from "vitest"
import { Product } from "../models/Product.js"

// titulo e preco e categoria já tem validação no metodo construtor

describe ("Product - testes unitarios",() => {
    it("Deve criar um produto valido", () => {

        const category_id = "ded69c7a-3ff9-473e-8df8-367801e1644b";
        const title = "Pizza de 5 queijo";
        const description = "pizza de queijo com 5 tipos de queijos diferentes desmanchando";
        const price = 80.99;
        const image = "🍕";

        const product = new Product(
            category_id,
            title,
            price,
            description,
            image,
        );

        expect(product.getCategoryId()).toBe("ded69c7a-3ff9-473e-8df8-367801e1644b");
        expect(product.getTitle()).toBe("Pizza de 5 queijo");
        expect(product.getPrice()).toBe(80.99);
        expect(product.getDescription()).toBe("pizza de queijo com 5 tipos de queijos diferentes desmanchando");
        expect(product.getImage()).toBe("🍕");
    });

    it("Não deve permitir criar um produto com preço negativo", () => {

        const category_id = "Pizzas";
        const preco = -1;

        expect(() => {
            
        })

    });

});