import { RecipesModel } from './../../models/recipes.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { MenuModel } from 'src/app/models/menu.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMenu: MenuModel[] = []
  error: string = "";

  constructor(private userService: UserService, private router: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    if(!this.userService.isLogin()){this.router.navigate(['login']);}

    this.menuService.sincroAllMenu();
    this.allMenu = this.menuService.allMenu;
  }
}
