import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginI } from '../interfaces/login.interface';
import { UsuarioI } from '../interfaces/usuario.interface';

const base_url = environment.base_Url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  constructor(private http: HttpClient, private router: Router, private nZone: NgZone) {

    this.googleInit();
  }


  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '645665318012-v7fscis29gc18lucf6hoskivg7diha76.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      // this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  logout() {
    localStorage.removeItem('token');
    // cerrar seccion del google
    this.auth2.signOut().then(() => {
      this.nZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      // console.log('User signed out.');
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }


  login(formData: LoginI) {
    // console.log('Creando Login');
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        // console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  };

  loginGoogle(token: string) {
    // console.log('Creando Login');
    // se envia  {token} por q es un objeto ojo ahi
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        // console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  };

  crearUsuario(formData: UsuarioI) {
    // console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        // console.log(resp);
        localStorage.setItem('token', resp.token)
      }));
  };
}
