import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage = '';
  public isDialogVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).pipe(
      take(1)
    ).subscribe(
      _ => {
        this.router.navigate(['home']);
      },
      error => {
        this.errorMessage = error.statusText || error.errorMessage || 'Unknown error';
        this.isDialogVisible = true;
      }
    );
  }

  public hasIsRequiredError(controlName: string): boolean {
    return this.isInvalid(controlName) && this.f(controlName).hasError('required');
  }

  public hasEmailInvalidError(controlName: string): boolean {
    return this.isInvalid(controlName) && this.f(controlName).hasError('email');
  }

  public isInvalid(controlName: string): boolean {
    return this.f(controlName).invalid && (this.f(controlName).dirty || this.f(controlName).touched);
  }

  private f(controlName: string): AbstractControl {
    return this.loginForm.controls[controlName];
  }
}
