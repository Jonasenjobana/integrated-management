import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
@Component({
  selector: 'app-zq-date',
  templateUrl: './zq-date.component.html',
  styleUrls: ['./zq-date.component.less']
})
export class ZqDateComponent implements OnInit {

  selectedTime: Date
  dateType: 'range' | 'default' = 'default'
  formatType: 'Date' | 'Year' = 'Year'

  constructor() { 
    this.selectedTime = new Date()
  }

  ngOnInit(): void {
    console.log(this.selectedTime)
  }
  
}
