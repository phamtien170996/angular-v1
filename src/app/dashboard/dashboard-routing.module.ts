import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookResolver } from '../core/book/book.resolver';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    {
      path: '',
      component: SummaryComponent,
    },
    {
      path: 'books',
      component: BooksListComponent,
      resolve: {
        books: BookResolver
      }
    },
    {
      path: 'books/add',
      component: BookEditComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
