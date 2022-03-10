import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmited: boolean = false;
  public auth2: any;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.email]],
    remember: [false],
  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private nZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      resp => {
        // console.log(resp);
        // funcion recuerdame
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // mensaje de login
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          color: '#54FF4F',
          background: '#fffff',
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'success',
          title: resp.msg
        });
        // fin del mensaje 
        // navegar al dasborad
        this.router.navigateByUrl('/');
      }, (error) => {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          color: '#E27878',
          background: '#fffff',
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'error',
          title: error.error.msg
        });
      });
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
  };

  // let id_token = googleUser.getAuthResponse().id_token;

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '645665318012-v7fscis29gc18lucf6hoskivg7diha76.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.usuarioService.loginGoogle(id_token).subscribe(
          resp => {
            // console.log(resp);
            // navegar al dasborad
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              color: '#54FF4F',
              background: '#fffff',
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
            Toast.fire({
              icon: 'success',
              title: resp.msg
            });
            this.nZone.run(() => {
              this.router.navigateByUrl('/');
            });
          }, (error) => {
            console.log(error);
          });
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


}
