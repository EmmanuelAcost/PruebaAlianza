// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/db/user.json'; //ruta de json con usuarios

  constructor(private http: HttpClient) { }

  login(document: string, password: string, typedoc: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => users.find(user => user.document === document && user.password === password && user.typedoc === typedoc))
    );
  }
}
