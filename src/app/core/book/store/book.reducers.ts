import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../model/book.model';
import { bookActionTypes } from './book.actions'

export interface BookState extends EntityState<Book> {
  booksLoaded: boolean;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({
  booksLoaded: false
});

export const bookReducer = createReducer(
  initialState,

  on(bookActionTypes.booksLoaded, (state, action) => {
    return adapter.addAll(
      action.books,
      { ...state, booksLoaded: true }
    );
  }),

  on(bookActionTypes.createBook, (state, action) => {
    return adapter.addOne(action.book, state);
  }),

  on(bookActionTypes.deleteBook, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  }),

  on(bookActionTypes.updateBook, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
