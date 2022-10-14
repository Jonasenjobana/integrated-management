import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonEntry } from './ButtonEntry';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }
  entryList: ButtonEntry[] = [
    {
      title: '二维码标签',
      path: '',
      icon: './assets/images/icon/code.png'
    },
    {
      title: '二维码标签',
      path: '',
      icon: './assets/images/icon/code.png'
    },
    {
      title: '二维码标签',
      path: '',
      icon: './assets/images/icon/code.png'
    },
  ]
  ngOnInit(): void {
  }
}
