import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDto } from '../models/loginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7152/api/Auth/register',
      user
    );
  }

  public login(user: LoginDto): Observable<string> {
    return this.http.post('https://localhost:7152/api/Auth/login', user, {
      responseType: 'text',
    });
  }
}
