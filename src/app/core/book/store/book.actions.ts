import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Book } from '../model/book.model';


export const loadBooks = createAction(
  '[Books List] Load Books via Service',
);

export const booksLoaded = createAction(
  '[Books Effect] Books Loaded Successfully',
  props<{ books: Book[] }>()
);

export const createBook = createAction(
  '[Create Book Component] Create Book',
  props<{ book: Book }>()
);

export const deleteBook = createAction(
  '[Books List Operations] Delete Book',
  props<{ bookId: string }>()
);

export const updateBook = createAction(
  '[Books List Operations] Update Book',
  props<{ update: Update<Book> }>()
);

export const bookActionTypes = {
  loadBooks,
  booksLoaded,
  createBook,
  deleteBook,
  updateBook
};
