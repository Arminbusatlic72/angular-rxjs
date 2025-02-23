import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  of,
  from,
  fromEvent,
  Observable,
  combineLatest,
  map,
  filter,
  BehaviorSubject,
} from 'rxjs';
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
    { id: 1, name: 'John', age: 30, isActive: true },
    { id: 2, name: 'Samir', age: 37, isActive: true },
    { id: 3, name: 'Irfan', age: 39, isActive: false },
  ];
  newUsers$ = of(this.newUsers);
  newUser$ = new BehaviorSubject<{ id: string; name: string | null }>({
    id: '',
    name: '',
  });
  newUsersNames$ = this.newUsers$.pipe(
    map((users) => users.map((user) => user.name))
  );
  filteredUsers$ = this.newUsers$.pipe(
    // filter((users) => users.every((user) => user.isActive))
    map((users) => users.filter((user) => user.isActive))
  );
  data$ = combineLatest([
    this.newUser$,
    this.newUsers$,
    this.newUsersNames$,
    this.filteredUsers$,
  ]).pipe(
    map(([newUsers, newUser, newUsersNames, filteredUsers]) => ({
      newUsers,
      newUser,
      newUsersNames,
      filteredUsers,
    }))
  );
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
    this.data$.subscribe((data) =>
      console.log('ovo je kombinovana lista', data)
    );
    this.data$.subscribe((data) =>
      console.log('This is combined object:', data)
    );

    setTimeout(() => {
      this.newUser$.next({ id: '1', name: 'John' });
    }, 2000);
    this.newUser$.subscribe((user) => console.log('user:', user));
  }
}
