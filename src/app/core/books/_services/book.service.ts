import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  SERVER_URL: string = "https://5e8c4176e61fbd00164ae95d.mockapi.io/";
  constructor(private httpClient: HttpClient) { }

  public getBooks() {
    return this.httpClient.get(this.SERVER_URL + 'books');
  }

  public getBook(bookId) {
    return this.httpClient.get(`${this.SERVER_URL + 'books'}/${bookId}`);
  }
  public createBook(book: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    return this.httpClient.post(`${this.SERVER_URL + 'books'}`, book)
  }

  public deleteBook(bookId) {
    return this.httpClient.delete(`${this.SERVER_URL + 'books'}/${bookId}`)
  }

  public updateBook(book: { id: number, amount: number, clientId: number, userId: number, description: string }) {
    return this.httpClient.put(`${this.SERVER_URL + 'books'}/${book.id}`, book)
  }

}
