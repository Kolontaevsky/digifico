import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../../auth/services/user-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  public user: User;
  constructor(private userStorageService: UserStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.userStorageService.user;
  }

  logout(): void {
    this.authService.logout();
  }
}
