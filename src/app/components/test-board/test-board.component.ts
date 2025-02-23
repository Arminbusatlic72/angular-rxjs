import { Component, OnInit } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
interface UserInterface {
  id: number;
  name: string;
}

interface UserDetailsInterface {
  id: number;
  age: number;
}

@Component({
  selector: 'app-test-board',
  imports: [CommonModule],
  templateUrl: './test-board.component.html',
  styleUrl: './test-board.component.css',
})
export class TestBoardComponent implements OnInit {
  users: UserInterface[] = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
  ];
  foo$: Observable<UserDetailsInterface>;
  constructor() {
    this.foo$ = this.getUser('1').pipe(
      concatMap((user) => this.getUserDetail(user))
    );
  }

  getUser(id: string) {
    const user = this.users.find((user) => user.id === Number(id))!;
    return of(user);
  }

  getUserDetail(user: UserInterface): Observable<UserDetailsInterface> {
    return of({ id: user.id, age: 30 });
  }
  ngOnInit(): void {
    this.foo$.subscribe((val) => console.log('this is the value of foo:', val));
  }
}
