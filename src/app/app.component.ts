import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, from, fromEvent, Observable, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestBoardComponent } from './components/test-board/test-board.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, DashboardComponent, TestBoardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  data: number = 0;

  newUsers = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Samir', age: 37 },
    { id: 3, name: 'Irfan', age: 39 },
  ];
  newUsers$ = of(this.newUsers);

  constructor() {
    const users = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Samir', age: 37 },
      { id: 3, name: 'Irfan', age: 39 },
    ];

    const messagePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved');
      }),
        1000;
    });
    const users$ = of(users);
    const customUser$ = new Observable((observer) => {
      observer.next(1);
    });
    const message$ = from(messagePromise);
    const bodyClick$ = fromEvent(document, 'click');
    users$.subscribe((data) => {
      console.log(data);
    });
    customUser$.subscribe((user) => console.log(user));
    message$.subscribe({
      next: (message) => {
        console.log(message);
      },
      error: (error) => console.log('err', error),
      complete: () => console.log('It is done'),
    });
    bodyClick$.subscribe((event) => {
      console.log(event);
    });
  }
  ngOnInit(): void {
    this.newUsers$.subscribe((data) =>
      console.log('ovo je in ng on init', data)
    );
  }
}
