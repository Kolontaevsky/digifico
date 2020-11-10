import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { PublicationsListComponent } from './components/publications-list/publications-list.component';
import { TableModule } from 'primeng/table';
import { PublicationValueExtractionPipe } from './pipes/publication-value-extraction.pipe';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    PublicationsListComponent,
    PublicationValueExtractionPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    TableModule
  ]
})
export class HomeModule {
}
