import { RecipeModel } from "./recipe.model";

export class MenuModel{
  constructor(
      public id : number = 0,
      public name: string = '',
      public quantity: number = 0,
      public price: number = 0,
      public healtScore: number = 0,
      public vegan: number = 0,
      public noVegan: number = 0,
      public items?: RecipeModel[]
  ){}
}
