import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { concatMap, take, tap } from 'rxjs/operators';
import { Publication, PublicationMetadata, PublicationsList } from '../../models/publication.model';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {
  public publicationsMetadata: Array<PublicationMetadata>;
  public publications: Array<Publication>;

  constructor(
    private publicationService: PublicationService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.publicationService.getPublicationsMetadata().pipe(
      take(1),
      tap(publicationsMetadata => {
        this.publicationsMetadata = publicationsMetadata
          .filter(metadata => !metadata.isHidden)
          .sort((a, b) => a.priority - b.priority);
      }),
      concatMap(_ => this.publicationService.getPublications())
    ).subscribe((publications: PublicationsList) => {
      this.publications = publications.result;
    });
  }

  public editPublication(publication: Publication): void {
    this.isSidebarOpened = true;
    this.router.navigate([`home/publications-list/edit/${publication.id}`]);
  }

  public sidebarClosed(): void {
    this.router.navigate(['home/publications-list']);
  }

  public get isSidebarOpened(): boolean {
    return this.sidebarService.isSidebarOpened;
  }

  public set isSidebarOpened(value: boolean) {
    this.sidebarService.isSidebarOpened = value;
  }
}
