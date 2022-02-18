import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string = '';
  public tituloSusb$!: Subscription;


  constructor(private router: Router, actRoute: ActivatedRoute) {

    // console.log(actRoute.snapshot.children[0].data);

    this.tituloSusb$ = this.getTitulo().subscribe(data => {
      // console.log(data);
      this.titulo = data.titulo;
      document.title = `HospitalPro - ${this.titulo}`;
    });

  }
  ngOnDestroy(): void {
    this.tituloSusb$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getTitulo() {
    return this.router.events
      .pipe(
        filter((e): e is ActivationEnd => e instanceof ActivationEnd),
        filter((e: ActivationEnd) => e.snapshot.firstChild === null),
        map((e: ActivationEnd) => e.snapshot.data),
      );

  }
}
