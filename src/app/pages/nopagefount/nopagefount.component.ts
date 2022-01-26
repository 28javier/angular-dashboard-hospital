import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefount',
  templateUrl: './nopagefount.component.html',
  styleUrls: ['./nopagefount.component.css']
})
export class NopagefountComponent implements OnInit {

  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
