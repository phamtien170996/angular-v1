import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'


@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {

    let books = [
      { id: 1, name: 'Hydrogen', price: 1.0079, symbol: 'H' },
      { id: 2, name: 'Helium', price: 4.0026, symbol: 'He' },
      { id: 3, name: 'Lithium', price: 6.941, symbol: 'Li' },
      { id: 4, name: 'Beryllium', price: 9.0122, symbol: 'Be' },
      { id: 5, name: 'Boron', price: 10.811, symbol: 'B' },
      { id: 6, name: 'Carbon', price: 12.0107, symbol: 'C' },
      { id: 7, name: 'Nitrogen', price: 14.0067, symbol: 'N' },
      { id: 8, name: 'Oxygen', price: 15.9994, symbol: 'O' },
      { id: 9, name: 'Fluorine', price: 18.9984, symbol: 'F' },
      { id: 10, name: 'Neon', price: 20.1797, symbol: 'Ne' },
    ];

    return { books };

  }
}
