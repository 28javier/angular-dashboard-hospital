import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setings',
  templateUrl: './account-setings.component.html',
  styleUrls: ['./account-setings.component.css']
})
export class AccountSetingsComponent implements OnInit {

  public linkTheme = document.getElementById('theme');

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.claseCheck();
  }

  changeTheme(theme: string) {
    // // console.log(theme);
    // // const url = `./assets/css/colors/default-dark.css`;
    // const url = `./assets/css/colors/${theme}.css`;
    // // console.log(linkTheme);
    // // console.log(url);
    // this.linkTheme?.setAttribute('href', url);
    // localStorage.setItem('theme', url);
    this.settingsService.changeTheme(theme);
    this.settingsService.claseCheck();
  }


}
