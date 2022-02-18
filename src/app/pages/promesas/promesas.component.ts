import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.getUsuarios();
    this.getUsuarios().then(usuarios => {
      // console.log(usuarios);
    });

    //   const promesa = new Promise((resolve, reject) => {
    //     if (false) {
    //       resolve('Hola amundo');
    //     } else {
    //       reject('Algo salio mal');
    //     }
    //   });
    //   promesa.then((mensaje) => {
    //     console.log(mensaje);
    //   }).catch(errr => console.log('Error en la promesa ' + errr));
    //   console.log('Fin del Init');

  }

  getUsuarios() {
    // fetch('https://reqres.in/api/users')
    //   .then(resp => {
    //     // console.log('Tengo data');
    //     // console.log(resp);
    //     resp.json().then(body => console.log(body))
    //   });

    const promesa = new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        // .then(body => console.log(body.data)
        .then(body => resolve(body.data)
        );
    });
    return promesa;
  }

}
