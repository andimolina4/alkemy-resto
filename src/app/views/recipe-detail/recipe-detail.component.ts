import { SpoonacularService } from './../../services/spoonacular.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  loading : boolean = false;
  resp : RecipeModel = new RecipeModel();
  error : string = "";
  id : number = 0;

  constructor(
    private spoonacularService: SpoonacularService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(!this.userService.isLogin()){this.router.navigate(['login']);}

    this.id = this.activeRoute.snapshot.params['id'];
    this.loading = true;

    this.spoonacularService.getRecipe(this.id).subscribe( (resp) => {
      this.resp = resp;
      console.log(resp);
      this.loading = false;
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
