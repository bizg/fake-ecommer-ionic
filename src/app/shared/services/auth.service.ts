import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, {
      username: username,
      password: password
    });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
}
