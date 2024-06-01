import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, IToken } from '../models/auth';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  postLogin(obj: Auth) {
    return this._http.post<IToken>(`${environment.API_URL}auth/login`, obj)
  }
}
