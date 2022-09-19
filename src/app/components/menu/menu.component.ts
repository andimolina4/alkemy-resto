import { MenuModel } from './../../models/menu.model';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menu : MenuModel = new MenuModel(0, '', 0);

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  updateMenu($event:boolean){
    this.menu = this.menuService.getMenu(this.menu.name);
  }
}
