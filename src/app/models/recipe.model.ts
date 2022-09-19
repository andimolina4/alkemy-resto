export class RecipeModel{
  constructor(
    public id: number = 0,
    public title: string = '',
    public image: string = '',
    public imageType: string = '',
    public healthScore: number = 0,
    public pricePerServing: number = 0,
    public vegetarian: boolean = false,
    public summary: string = '',
    public nutrition: NutritionModel = new NutritionModel()
  ){}
}

export class NutritionModel{
  constructor(
    public ingredients: IngredientsModel[] = [],
    public nutrients: NutrientsModel[] = []
  ){}
}

export class IngredientsModel{
  constructor(
    public amount: number = 0,
    public name: string = '',
    public unit: string = ''
  ){}
}

export class NutrientsModel{
  constructor(
      public amount: number = 0,
      public name: string = '',
      public unit: string = ''
    ){}
}
