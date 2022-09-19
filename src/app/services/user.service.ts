import { TokenModel } from 'src/app/models/token.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '../models/user.model';

const URL = "http://challenge-react.alkemy.org/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: string, pass: string):Observable<TokenModel>{
    return this.http.post<TokenModel>(URL, { email: user, password: pass});
  }

  isLogin():boolean{
    return localStorage.getItem('apiKey') != null;
  }

  logOut(){
    localStorage.removeItem('apiKey');
  }
}
