import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { PublicationsListComponent } from './components/publications-list/publications-list.component';
import { TableModule } from 'primeng/table';
import { PublicationValueExtractionPipe } from './pipes/publication-value-extraction.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { PublicationEditComponent } from './components/publication-edit/publication-edit.component';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    PublicationsListComponent,
    PublicationValueExtractionPipe,
    PublicationEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    TableModule,
    SidebarModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule
  ],
  providers: [
    PublicationValueExtractionPipe
  ]
})
export class HomeModule {
}
