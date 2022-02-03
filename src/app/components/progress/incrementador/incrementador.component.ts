import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 10; //Renombrar el input por si acaso asi se hace
  @Input() btnClass: string = 'btn btn-info'; //Renombrar el input por si acaso asi se hace
  // @Input() progreso: number = 10;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`
  }

  cambiarValor(valor: number) {
    if ((valor < 0 && this.progreso <= 0) || (valor > 0 && this.progreso >= 100)) {
      this.valorSalida.emit(valor);
      return;
    }
    // this.percent +=  value;
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
    console.log(this.progreso);

  }

}
