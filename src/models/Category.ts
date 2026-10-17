import { ValidationError } from "../errors/ValidationError.js";


export class Category {
    private id?: string | undefined;
    private name : string;
    private description: string | undefined;
    private icon: string | undefined;
    private display_order: number;
    private active: boolean;

    //====================
    //metodo construtor
    //====================

    constructor(name: string, display_order: number, description?: string, icon?: string){
        this.id = undefined;
        this.name = "";
        this.description = description;
        this.icon = icon;
        this.display_order = 0;
        this.active = true;

        this.rename(name);
        this.changeDisplayOrder(display_order);
    }

    static restore(
        id : string,
        name : string, 
        display_order: number,
        active: boolean,
        description: string,
        icon: string,
    ): Category {
        const category = new Category(name, display_order, description, icon);

        category.id = id;
        category.active = active;

        return category;
    }
    
    //====================
    //getters
    //====================

    //entende que ele é publivo automaticamente, pode colocar na frente public ou não 
    getId(): string | undefined{ 
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getDescription(): string | undefined{
        return this.description;
    }
    getIcon(): string | undefined{
        return this.icon;
    }
    getDisplayOrder(): number{
        return this.display_order;
    }
    isActive(): boolean{
        return this.active;
    }

    //====================
    //setters
    //====================

    rename(name: string): void{
    // validação do nome
        if(typeof name !== "string" || name.trim().length === 0){
            throw new ValidationError( "O nome da categoria é obrigatório.");
        }
        this.name = name;
    }

    changeDescription(description: string): void{
        this.description = description;
    }

    changeIcon(icon:string): void{
        this.icon = icon;
    }

    changeDisplayOrder(display_order: number): void{
    // validação da entrada de valores do display order
        if(!Number.isInteger(display_order) || display_order < 0){
            throw new ValidationError( 
                "A ordem de exibição deve ser um número inteiro maior ou igual a zero. "
            );
        }

        this.display_order = display_order;
    }

    //====================
    //others
    //====================

    activate(): void{
        this.active = true;
    }
    deactivate(): void{
        this.active = false
    }

}

// mostra como é a estrutura do Category
//classe que define os comportamentos que o sistema deve seguir + validações de erros
//para evitar acesso direto usa setters e getters 
//getters só retornam os valores
//setters modificam os valores