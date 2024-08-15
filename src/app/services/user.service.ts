import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModelLogin, UserModelRegister } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = environment.dotnet_api_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  Login(data: UserModelLogin): Observable<UserModelLogin> {
    return this.http.post<UserModelLogin>(
      this.apiURL + 'Authenticate/login',
      data,
      this.httpOptions
    );
  }

  Register(data: UserModelRegister): Observable<UserModelRegister> {
    return this.http.post<UserModelRegister>(
      this.apiURL + 'Authenticate/register-user',
      data,
      this.httpOptions
    );
  }
}
