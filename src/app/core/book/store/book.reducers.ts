import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../model/book.model';
import { bookActionTypes } from './book.actions'
import { QueryParamsModel } from '../../_base/crud/models/query-models/query-params.model';

export interface BookState extends EntityState<Book> {
  booksLoaded: boolean;
  listLoading: boolean;
	actionsloading: boolean;
	totalCount: number;
	lastCreatedBookId: string;
	lastQuery: QueryParamsModel;
	showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({
  booksLoaded: false,
	listLoading: false,
	actionsloading: false,
	totalCount: 0,
	lastCreatedOrgId: undefined,
	lastQuery: new QueryParamsModel({}),
	showInitWaitingMessage: true
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
