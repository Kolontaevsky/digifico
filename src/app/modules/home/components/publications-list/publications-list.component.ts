import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { concatMap, take, tap } from 'rxjs/operators';
import { Publication, PublicationMetadata, PublicationsList } from '../../models/publication.model';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {
  public publicationsMetadata: Array<PublicationMetadata>;
  public publications: Array<Publication>;

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.publicationService.getPublicationsMetadata().pipe(
      take(1),
      tap(publicationsMetadata => {
        this.publicationsMetadata = publicationsMetadata
          .sort((a, b) => a.priority - b.priority)
          .filter(metadata => !metadata.isHidden);
      }),
      concatMap(_ => this.publicationService.getPublications())
    ).subscribe((publications: PublicationsList) => {
      this.publications = publications.result;
    });
  }

  editPublication(publication: Publication) {
    console.log(publication);
  }
}
