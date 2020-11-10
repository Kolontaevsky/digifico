import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fakeApiProvider } from './interceptors/fake-api.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    fakeApiProvider
  ]
})
export class CoreModule { }
