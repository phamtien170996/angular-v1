import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../core/book/_services/book.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'symbol', 'action'];
  books = new MatTableDataSource<any>([]);
  constructor(private bookService: BookService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any[]) => {
      this.books = new MatTableDataSource<any>(data);
      this.books.paginator = this.paginator;
      this.books.sort = this.sort;
    })
  }

  editBook(book) {
    console.log('editBook');
  }

  deleteBook(book) {
    console.log('deleteBook');
  }
}
