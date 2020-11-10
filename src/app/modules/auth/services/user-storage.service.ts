import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private currentUser$: BehaviorSubject<User>;

  constructor() {
    this.currentUser$ = new BehaviorSubject<User>(this.userFromLocalStorage);
  }

  public saveNewUserData(user: User): void {
    this.saveUserToLocalStorage(user);
    this.currentUser$.next(user);
  }

  private get userFromLocalStorage(): User | null {
    const userData = localStorage.getItem('userData');

    if (userData) {
      return JSON.parse(userData) as User;
    }

    return null;
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
