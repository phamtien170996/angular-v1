

import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { BookActionTypes } from '../_actions/book.actions';

export interface BooksState extends EntityState<any> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedOrgId: string;
  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialBooksState: BooksState = adapter.getInitialState({
  bookForEdit: null,
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastCreatedOrgId: undefined,
  showInitWaitingMessage: true
});

export function booksReducer(state = initialBooksState, action: BookActionTypes): any { }
