import { RecipeModel } from "./recipe.model";


export class RecipesModel{
  constructor(
    public results?: RecipeModel[],
    public offset?: number,
    public number?: number,
    public totalResults?: number
    ){}
}
