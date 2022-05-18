// Looks exactly like a JAVA model! 
/*
What is model and Interface in angular?
The Interface describes either a contract for a class or a new type. 
It is a pure Typescript element, so it doesn't affect Javascript. 
A model, and namely a class, is an actual JS function which is being used to generate new objects
*/
import { Ingredient } from "app/components/Shared/ingredient.model";

export class Recipe{

    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, image: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = image;
        this.ingredients = ingredients;
    };

};

