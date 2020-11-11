import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { Publication, PublicationMetadata } from '../../models/publication.model';
import { ActivatedRoute } from '@angular/router';
import { concatMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicationValueExtractionPipe } from '../../pipes/publication-value-extraction.pipe';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.scss']
})
export class PublicationEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public publication: Publication;
  public publicationEditMetadata: Array<PublicationMetadata>;
  public publicationWasNotLoaded = false;
  public editPublicationForm: FormGroup;
  public publicationForSave: Publication;

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute,
    private publicationValueExtractionPipe: PublicationValueExtractionPipe
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        if (params?.id) {
          return this.publicationService.getPublicationById(+params.id);
        }

        return of(null);
      }),
      tap(publication => {
        if (publication) {
          this.publication = publication;
        } else {
          this.publicationWasNotLoaded = true;
        }
      }),
      concatMap(_ => {
        return this.publicationService.getPublicationEditMetadata();
      }),
      tap((publicationEditMetadata: Array<PublicationMetadata>) => {
        this.publicationEditMetadata = publicationEditMetadata
          .filter(metadata => !metadata.isHidden)
          .sort((a, b) => a.priority - b.priority);
      })
    ).subscribe(_ => {
      if (this.publication) {
        this.createEditPublicationForm();
      }
    });
  }

  private createEditPublicationForm(): void {
    this.editPublicationForm = new FormGroup({});

    this.publicationEditMetadata.forEach(metadata => {
      const value = this.publicationValueExtractionPipe.transform(this.publication, metadata.fieldId);
      const formControl = new FormControl({
        value: metadata.type === 'datatime' ? new Date(value) : value,
        disabled: metadata.isReadOnly
      }, metadata.isMandatory ? [Validators.required] : []);

      this.editPublicationForm.addControl(metadata.fieldCode, formControl);
    });
  }

  public isRequired(formControlName: string): boolean {
    const control = this.editPublicationForm.controls[formControlName];
    return control.hasError('required') && (control.touched || control.dirty);
  }

  public savePublication(): void {
    if (this.editPublicationForm.invalid) {
      return;
    }

    const { id, code } = this.publication;
    const data = [];

    for (const key in this.editPublicationForm.value) {
      if (this.editPublicationForm.value.hasOwnProperty(key)) {
        const controlMetadata = this.publicationEditMetadata.find(metadata => metadata.fieldCode === key);

        data.push({
          fieldId: controlMetadata.fieldId,
          value: controlMetadata.type === 'datatime' ?
            this.editPublicationForm.value[key].toISOString() :
            this.editPublicationForm.value[key]
        });
      }
    }

    this.publicationForSave = { id, code, data };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
