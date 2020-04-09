import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';


@Injectable()
export class BookService {

  SERVER_URL: string = "https://5e8c4176e61fbd00164ae95d.mockapi.io/";
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.SERVER_URL + 'books');
  }

  getBook(bookId): Observable<Book> {
    return this.http.get<Book>(`${this.SERVER_URL + 'books'}/${bookId}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.SERVER_URL + 'books', book);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.SERVER_URL + 'books'}/${bookId}`);
  }

  updateBook(bookId: string | number, changes: Partial<Book>): Observable<any> {
    return this.http.put(`${this.SERVER_URL + 'books'}/${bookId}`, changes);
  }
}
