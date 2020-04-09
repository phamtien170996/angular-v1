import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState, selectAll } from './book.reducers';
// Lodash
import { each } from 'lodash';
import { Book } from '../model/book.model';
import { HttpExtenstionsModel } from '../../_base/crud/models/http-extentsions-model';
import { QueryResultsModel } from '../../_base/crud/models/query-models/query-results.model';

export const bookFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooks = createSelector(
  bookFeatureSelector,
  selectAll
);

export const areBooksLoaded = createSelector(
  bookFeatureSelector,
  state => state.booksLoaded
);

export const booksPageLoading = createSelector(
  bookFeatureSelector,
  state => state.listLoading
)

export const selectBooksShowInitWaitingMessage = createSelector(
  bookFeatureSelector,
  state => state.showInitWaitingMessage
);

export const selectBooksInStore = createSelector(
  bookFeatureSelector,
  state => {
    const items: Book[] = [];
    each(state.entities, element => {
      items.push(element);
    });
    const httpExtension = new HttpExtenstionsModel();
    const result: Book[] = httpExtension.sortArray(items, state.lastQuery.sortField, state.lastQuery.sortOrder);
    return new QueryResultsModel(result, state.totalCount, '');
  }
);
