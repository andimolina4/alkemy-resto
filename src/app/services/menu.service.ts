import { SpoonacularService } from 'src/app/services/spoonacular.service';
import { MenuModel } from './../models/menu.model';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  allMenu: MenuModel[] = [];

  constructor(public spoonacularService:SpoonacularService) { }

  //Get todos los nombres de los menus creados.
  getAllMenuName():string[]{
    return JSON.parse(localStorage.getItem("AllMenuResto") || "[]");
  }

  //Setea un nuevo nombre de menu.
  setMenuName(name: string):boolean{
    try {
      let allMenu = this.getAllMenuName();
      allMenu.push(name);

      localStorage.setItem("AllMenuResto", JSON.stringify(allMenu));
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  //Actualiza los menus del localStorage en la property allMenu
  sincroAllMenu(){
    let allMenuName = this.getAllMenuName();
    let allMenu: MenuModel[] = [];

    allMenuName.forEach((x) => {
      allMenu.push(this.getMenu(x));
    });

    this.allMenu = allMenu;
  }

  //Setea un nuevo menu en el localStorage
  setMenu(menu: MenuModel):boolean{
    try {
      localStorage.setItem(menu.name, JSON.stringify(menu));
      this.sincroAllMenu();

      return true;
    } catch(error){
      console.log(error);
      return false;
    }
  }

  //Si el menu existe, lo busca por nombre, sino devuelve una nueva instancia.
  getMenu(name: string):MenuModel{
    if(localStorage.getItem(name) == 'undefined'){
      return new MenuModel(Math.floor(Math.random() * 1000000), name,0,0,0,0,0)
    }else{
      return JSON.parse(localStorage.getItem(name) || "{}");
    }
  }

  //Guarda un nuevo plato en un menu existente.
  setItemMenu(item : RecipeModel, nameMenu : string):any{
      let menu = this.getMenu(nameMenu);

      try {
        // Evaluo si se puede agregar al menu
        let itemExist = menu.items?.find(x => x.id == item.id);
        if(menu.quantity >= 4 || itemExist !== undefined  || (item.vegetarian && menu.vegan >= 2) || (!item.vegetarian && menu.noVegan >= 2)){
          return false;
        }

        /*if(item.vegetarian){
          if(menu.vegan == undefined){
            menu.vegan = 1;
          }else{
            menu.vegan++;
          }
        }else{
          if(menu.noVegan == undefined){
            menu.noVegan = 1;
          }else{
            menu.noVegan++;
          }
        }*/

        if(menu.items == undefined){
          menu.items = [item];
        }else{
          menu.items.push(item);
        }

        menu.vegan = menu.items.filter(x => x.vegetarian).length;
        menu.noVegan = menu.items.filter(x => !x.vegetarian).length;

        menu.quantity = menu.items.length;
        menu.name = nameMenu;
        menu.price = menu.items.reduce((x, y) => x + y.pricePerServing, 0);
        menu.healtScore = menu.items.reduce((x, y) => x + y.healthScore, 0);

        localStorage.setItem(nameMenu, JSON.stringify(menu));

        this.sincroAllMenu();

        return true;
      } catch(error) {
        console.log(error);
        return false;
      }
  }

  //Elimina un nuevo por su nombre de key en el localStorage
  deleteMenu(name: string):boolean{
    try {
      localStorage.removeItem(name);

      this.sincroAllMenu();
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  //Elimina un producto de un determinado menu.
  deleteItemMenu(nameMenu: string, idItem: number):boolean{
    try {

      let menu = this.getMenu(nameMenu);

      if(menu.items !== undefined){
        menu.items = menu.items.filter(x => x.id != idItem);

        menu.vegan = menu.items.filter(x => x.vegetarian).length;
        menu.noVegan = menu.items.filter(x => !x.vegetarian).length;
        menu.quantity = menu.items.length;

        localStorage.setItem(nameMenu, JSON.stringify(menu));

        this.sincroAllMenu();
      }

      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
