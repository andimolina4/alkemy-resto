import { RecipeModel } from './../../models/recipe.model';
import { MenuService } from './../../services/menu.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesModel } from 'src/app/models/recipes.model';
import { SpoonacularService } from 'src/app/services/spoonacular.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  resp: RecipesModel = new RecipesModel();
  loading : boolean = false;
  error: string = "";
  allMenusName: string[] = [];
  form: FormGroup;
  formSearch: FormGroup;
  activeRecipe: RecipeModel = new RecipeModel;

  constructor(
    private spoonacularService: SpoonacularService,
    private userService: UserService,
    private router: Router,
    private menuService: MenuService,
    private formBuilder: FormBuilder
    ) {
      this.form = formBuilder.group({
        nameMenu: [""]
      });
      this.formSearch = formBuilder.group({
        search: [""]
      })
     }

  ngOnInit(): void {
    if(!this.userService.isLogin()){this.router.navigate(['login']);}

    this.loading = true;

    //Se obtienen todos los productos
    this.spoonacularService.getAll().subscribe( (resp) => {
      this.resp = resp;
      this.loading = false;
      console.log(resp)
    },
    (err) => {
      this.error = err.message;
      this.loading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Se ha producido un error al cargar.',
        icon: 'error',
        confirmButtonText: 'Volver'
      })
    })


    //Se obtienen todos los menus
    this.allMenusName = this.menuService.getAllMenuName();
  }

  addMenuName(){
    let menuName = this.form.get('nameMenu')?.value

    if(menuName !== undefined){
      this.menuService.setMenuName(menuName);
      this.allMenusName = this.menuService.getAllMenuName();
    }
  }

  addItemMenu(nameMenu: string){
    if(this.menuService.setItemMenu(this.activeRecipe, nameMenu)){
      Swal.fire({
        title: 'Exito!',
        text: 'El producto se ha al menu con exito',
        icon: 'success',
        confirmButtonText: 'Volver'
      })
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Se ha producido un error.',
        icon: 'error',
        confirmButtonText: 'Volver'
      })
    }

  }

  receiveMessage($event: RecipeModel) {
    this.activeRecipe = $event;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    let search = this.formSearch.get('search')?.value
    if(search.length > 2){
      this.loading = true;

      //Se obtienen todos los productos
      this.spoonacularService.getBySearch(search).subscribe( (resp) => {
        this.resp = resp;
        this.loading = false;
        console.log(resp)
      },
      (err) => {
        this.error = err.message;
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Se ha producido un error al cargar.',
          icon: 'error',
          confirmButtonText: 'Volver'
        })
      })
    }
  }
}
