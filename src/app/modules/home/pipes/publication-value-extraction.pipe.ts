import { Pipe, PipeTransform } from '@angular/core';
import { Publication } from '../models/publication.model';

@Pipe({
  name: 'publicationValueExtraction'
})
export class PublicationValueExtractionPipe implements PipeTransform {
  transform(value: Publication, fieldId: number): string {
    return value.data.find(data => data.fieldId === fieldId).value;
  }
}
