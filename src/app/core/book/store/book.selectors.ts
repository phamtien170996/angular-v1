import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState, selectAll } from './book.reducers';

export const bookFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooks = createSelector(
  bookFeatureSelector,
  selectAll
);

export const areBooksLoaded = createSelector(
  bookFeatureSelector,
  state => state.booksLoaded
);
