import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmited: boolean = false;
  public registerForm = this.fb.group({
    nombre1: ['user1', [Validators.required, Validators.minLength(3)]],
    nombre2: ['user1', [Validators.required, Validators.minLength(3)]],
    apellido1: ['user1', [Validators.required, Validators.minLength(3)]],
    apellido2: ['user1', [Validators.required, Validators.minLength(3)]],
    email: ['user1@gmail.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required]],
    password2: ['1234567', [Validators.required]],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(public fb: FormBuilder, public usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {

      return console.log('Formulario no Posteado');
    };

    //Realizar Posteo si es valido
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      resp => {
        console.log('Usuario Creado');
        console.log(resp);
        // mensaje de accio correta
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
        //fin del mensaje
        // navegar al dasborad
        this.router.navigateByUrl('/login');
      }, (error) => {
        console.warn(error.error.msg);
        // si sucede un error
        // Swal.fire('Error', error.error.msg, 'error');
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
  };

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  };

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  };

  cantrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if ((pass1 !== pass2) && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  };

  // validar que se haga el posteo correcto
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({
          noEsIgual: true
        });
      }
    }
  }

}
