import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() recipe : RecipeModel = new RecipeModel();
  @Output() ev = new EventEmitter<RecipeModel>();
  @Output() evDelete = new EventEmitter<boolean>();
  @Input() delete: boolean = false;
  @Input() nameMenu: string = '';

  constructor( private menuService: MenuService) { }

  ngOnInit(): void {
    console.log(this.recipe)
  }

  open(){
    this.ev.emit(this.recipe);
  }

  deleteItem(){
    if(this.recipe.id !== undefined && this.menuService.deleteItemMenu(this.nameMenu, this.recipe.id)){
      this.evDelete.emit(true);
      Swal.fire({
        title: 'Exito!',
        text: 'El producto se ha eliminado del menu con exito',
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
}
