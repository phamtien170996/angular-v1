
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import { areBooksLoaded } from './store/book.selectors';
import { loadBooks } from './store/book.actions';

@Injectable()
export class BookResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areBooksLoaded),
        tap(() => {
          this.store.dispatch(loadBooks());
        }),
        filter(booksLoaded => booksLoaded),
        first()
      );
  }
}
