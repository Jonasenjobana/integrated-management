import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor() { }
  customerName: string = '天元海科技'
  version: string = 'v1.1.0'
  ngOnInit(): void {
  }

}
