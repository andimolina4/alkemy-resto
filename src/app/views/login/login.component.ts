import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenModel } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service';
import {Router} from "@angular/router"
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resp : TokenModel = new TokenModel('');
  error: string = "";
  email: string = "";
  pass: string = "";
  form: FormGroup;
  showEmailError: boolean = false;
  showPassError: boolean = false;
  loading: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      email: ["", [Validators.required]],
      pass: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
  }


  login(){
    this.loading = true;
    this.showEmailError = this.form.get('email')?.errors?.['required'];
    this.showPassError = this.form.get('pass')?.errors?.['required'];

    if(this.showEmailError == undefined && this.showPassError == undefined){
      this.userService.login(this.form.get('email')?.value, this.form.get('pass')?.value).subscribe( (resp) => {


        this.resp = resp;
        localStorage.setItem('apiKey', this.resp.token);

        this.router.navigate([''])
        //localStorage.getItem('tutorial'); obtener dato
        //TODO: Redireccionar a Home
        this.loading = false;
      },
      (err) => {
        this.error = err.message;
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Email o Contraseña incorrecta.',
          icon: 'error',
          confirmButtonText: 'Volver'
        })
      })
    }

  }

}
