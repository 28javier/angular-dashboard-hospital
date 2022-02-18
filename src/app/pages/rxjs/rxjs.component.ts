import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalDesSubs?: Subscription;

  constructor() {
    // this.retornaObserbable().pipe(
    //   retry()
    // )
    //   .subscribe(valor => console.log('Subs: ', valor),
    //     errr => console.log('Error:', errr),
    //     () => console.log('Obs Complete'));

    this.intervalDesSubs = this.retornaInterval().subscribe(
      (valor) => {
        console.log(valor);
      })
  }
  ngOnDestroy(): void {
    this.intervalDesSubs?.unsubscribe();
  }

  retornaObserbable() {
    let i = -1;
    const obs$ = new Observable<number>(observer => {
      const obser = setInterval(() => {
        // console.log('Tik');
        i++;
        observer.next(i);
        if (i >= 4) {
          clearInterval(obser);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al ===2')
        }
      }, 1000);
    });
    return obs$;
  }
  retornaInterval() {
    const interval$ = interval(1000).pipe(
      // take(4), 
      map(valor => {
        return valor + 1
      }),
      filter(valor => (valor % 2 === 0) ? true : false)
    );
    return interval$;
  }
  ngOnInit(): void {
  }

}
