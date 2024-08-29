import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private registerUrl = 'http://127.0.0.1:3000/auth/register'; 
  private loginrUrl = 'http://127.0.0.1:3000/auth/login'; 

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.loginrUrl, userData);
  }
}
