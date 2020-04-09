// NGRX
import { Store, select } from '@ngrx/store';
// State
import { BaseDataSource } from '../../_base/crud/models/_base.datasource';
import { QueryResultsModel } from '../../_base/crud/models/query-models/query-results.model';
import { AppState } from 'src/app/store/reducers';
import { booksPageLoading, selectBooksShowInitWaitingMessage, selectBooksInStore } from '../store/book.selectors';


export class BooksDataSource extends BaseDataSource {
  constructor(private store: Store<AppState>) {
    super();

    this.loading$ = this.store.pipe(
      select(booksPageLoading)
    );

    this.isPreloadTextViewed$ = this.store.pipe(
      select(selectBooksShowInitWaitingMessage)
    );

    this.store.pipe(
      select(selectBooksInStore)
    ).subscribe((response: QueryResultsModel) => {
      this.paginatorTotalSubject.next(response.totalCount);
      this.entitySubject.next(response.items);
    });
  }
}
