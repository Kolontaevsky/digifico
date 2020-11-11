import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication, PublicationMetadata, PublicationsList } from '../models/publication.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(private httpClient: HttpClient) {}

  public getPublications(): Observable<PublicationsList> {
    return this.httpClient.get<PublicationsList>(`${environment.apiUrl}/publications`);
  }

  public getPublicationsMetadata(): Observable<Array<PublicationMetadata>> {
    return this.httpClient.get<Array<PublicationMetadata>>(`${environment.apiUrl}/publications/metadata`);
  }

  public getPublicationById(id: number): Observable<Publication> {
    return this.httpClient.get<Publication>(`${environment.apiUrl}/publications/edit`);
  }

  public getPublicationEditMetadata(): Observable<Array<PublicationMetadata>> {
    return this.httpClient.get<Array<PublicationMetadata>>(`${environment.apiUrl}/publications/edit/metadata`);
  }
}
