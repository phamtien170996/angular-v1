import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Book } from 'src/app/core/book';
import { Store } from '@ngrx/store';
import { createBook } from 'src/app/core/book/store/book.actions';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  constructor(fb: FormBuilder, private store: Store) {
    this.bookForm = fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      symbol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onAddBook() {
    const book: Book = { name: this.bookForm.value.name, price: this.bookForm.value.price, symbol: this.bookForm.value.symbol };
    this.store.dispatch(createBook({ book }));
  }

}
