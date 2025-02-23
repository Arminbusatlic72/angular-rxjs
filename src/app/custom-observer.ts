import { Observer } from 'rxjs';
export class CustomObserver implements Observer<number> {
  next(data: number) {
    console.log(data);
  }
  error(err: string) {
    console.log(err);
  }
  complete() {
    console.log('complete');
  }
}
