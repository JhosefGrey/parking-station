import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, IToken, User } from '../models/auth';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  postLogin(obj: Auth) {
    return this._http.post<IToken>(`${environment.API_URL}auth/login`, obj)
  }

  set token(token: string) {
    localStorage.setItem(environment.Prefix + 'token', token)
  }

  get token(): string | null {
    return localStorage.getItem(environment.Prefix + 'token')
  }

  set user(obj: User) {
    localStorage.setItem(environment.Prefix + 'user', JSON.stringify(obj))
  }

  get user(): User | null {
    return localStorage.getItem(environment.Prefix + 'token') === null ? null : JSON.parse(localStorage.getItem(environment.Prefix + 'token')!)
  }

}
