
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipeModel } from '../models/recipe.model';
import { RecipesModel } from '../models/recipes.model';

const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=bb8f95382e134637b0c806afb4ae40d0";
const API_KEY = "bb8f95382e134637b0c806afb4ae40d0"

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  constructor(private http: HttpClient) { }

  getAll():Observable<RecipesModel>{
    return this.http.get<RecipesModel>(URL + '&addRecipeInformation=true');
  }

  getRecipe(id: number):Observable<RecipeModel>{
    return this.http.get<RecipeModel>(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
  }

  getBySearch(search: string):Observable<RecipesModel>{
    return this.http.get<RecipesModel>(`${URL}&query=${search}&addRecipeInformation=true`);
  }
}
