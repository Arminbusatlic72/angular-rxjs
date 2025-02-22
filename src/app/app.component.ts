import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, from } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  data: number = 0;
  constructor() {
    const numbers$ = from([1, 2, 3, 4, 5]);
    numbers$.subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }
}
