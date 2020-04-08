import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showFiller = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickMenu() {
    this.showFiller = !this.showFiller
  }

  getBooks() {
    this.router.navigateByUrl('/dashboard/books')
  }

  getDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
}
