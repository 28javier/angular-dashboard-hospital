import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.getElementById('theme');

  constructor() {
    console.log('Setting desde el servicio');
    this.thema();
  }

  thema() {
    // ./assets/css/colors/default-dark.css
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    // console.log(theme);
    // const url = `./assets/css/colors/default-dark.css`;
    const url = `./assets/css/colors/${theme}.css`;
    // console.log(linkTheme);
    // console.log(url);
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    // this.claseCheck();
  }

  claseCheck() {
    const links = document.querySelectorAll('.selector');
    // console.log(links);
    links.forEach(e => {
      e.classList.remove('working');
      const btnTheme = e.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentheme = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currentheme) {
        e.classList.add('working');
      }
    });
  }


}
