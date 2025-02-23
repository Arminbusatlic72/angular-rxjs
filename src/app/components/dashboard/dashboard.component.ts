import { Component, OnInit } from '@angular/core';
import {
  from,
  Observable,
  map,
  of,
  delay,
  mergeMap,
  concatMap,
  exhaustMap,
} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Fixed typo: `styleUrl` → `styleUrls`
})
export class DashboardComponent implements OnInit {
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  foo$: Observable<number>;

  constructor() {
    this.foo$ = from(this.test).pipe(map((item) => item * 10));

    const example = (operator: any) => {
      from([0, 1, 2, 3, 4, 5])
        .pipe(operator((x: any) => of(x).pipe(delay(500))))
        .subscribe({
          next: console.log,
          complete: () => console.log(`${operator.name} completed`),
        });
    };

    example(exhaustMap);
  }

  ngOnInit(): void {
    this.foo$.subscribe((arr) => console.log(arr));
  }
}
