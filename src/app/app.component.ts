import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  data: number = 0;
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
    const message$ = from(messagePromise);
    const bodyClick$ = fromEvent(document, 'click');
    users$.subscribe((data) => {
      console.log(data);
    });
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
}
