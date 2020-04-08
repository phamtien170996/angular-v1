import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { bookReducer } from 'src/app/core/book';


export interface AppState {
  books: any;
}

export const reducers: ActionReducerMap<AppState> = {
  books: bookReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
