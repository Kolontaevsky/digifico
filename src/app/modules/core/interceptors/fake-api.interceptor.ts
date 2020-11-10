import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../../auth/models/user.model';
import { PublicationMetadata, PublicationsList } from '../../home/models/publication.model';
import PublicationListValues from '../../../../assets/data/publications/Publication.values.json';
import PublicationMetadataValues from '../../../../assets/data/publications/Publication.metadata.json';

@Injectable()
export class FakeApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    return of(null).pipe(
      mergeMap(() => {
        switch (true) {
          case url.endsWith('/login') && method === 'POST':
            return login();

          case url.endsWith('/publications') && method === 'GET':
            return getPublications();

          case url.endsWith('/publications/metadata') && method === 'GET':
            return getPublicationsMetadata();

          default:
            return next.handle(req);
        }
      })
    );

    function login(): Observable<HttpResponse<User>> {
      const { email, password } = body;

      if ((email && email === 'admin@admin.com') && (password && password === 'admin')) {
        return success({
          email,
          token: 'some-jwt-token'
        });
      }

      return error('Error in E-mail or password');
    }

    function getPublications(): Observable<HttpResponse<PublicationsList>> {
      return success(PublicationListValues);
    }

    function getPublicationsMetadata(): Observable<HttpResponse<Array<PublicationMetadata>>> {
      return success(PublicationMetadataValues);
    }

    function success<T>(responseBody: T): Observable<HttpResponse<T>> {
      return of(new HttpResponse({ status: 200, body: responseBody }));
    }

    function error(errorMessage: string): Observable<never> {
      return throwError({ errorMessage });
    }
  }
}

export const fakeApiProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiInterceptor,
  multi: true
};
