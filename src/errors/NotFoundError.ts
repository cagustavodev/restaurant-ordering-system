export class NotFoundError extends Error{
    constructor(message: string){
        super(message);

        this.name = "NotFoundError"; 
    }
}
//extends = herda as caracteristicas de outra classe, nesse caso erro