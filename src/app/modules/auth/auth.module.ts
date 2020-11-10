import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class AuthModule { }
