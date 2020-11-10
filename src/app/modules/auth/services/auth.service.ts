import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoginDTO } from '../models/login-dto.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { UserStorageService } from './user-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private userStorageService: UserStorageService, private router: Router) {}

  login(loginData: LoginDTO): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/login`, loginData).pipe(
      tap((user: User) => {
        this.userStorageService.saveNewUserData(user);
      })
    );
  }
}
