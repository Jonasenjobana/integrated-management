import { Column, ColumnOption } from './../../share/module/zq-table/model/zq-table-model';
import { AfterContentChecked, Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tt',
  templateUrl: './tt.component.html',
  styleUrls: ['./tt.component.less']
})
export class TtComponent implements OnInit, AfterViewInit {
  id: string = 'asd123'
  tableData: Array<any> = [
    {
      name: 'Pat',
      age: 18,
      clazz: '高三3班'
    },
    {
      name: 'Tony',
      age: 19,
      clazz: '高三3班'
    },
    {
      name: 'Tim',
      age: 18,
      clazz: '高三3班'
    }
  ]
  column: Column[] =  [
      {
        propertyName: 'name',
        columnName: '姓名',
        type: '',
        width: 50,
        option: Object.assign(new ColumnOption(), {
          isLink: true,
        })
      },
      {
        propertyName: 'age',
        columnName: '年龄',
        type: '',
        width: 150,
        option: new ColumnOption()
      },
      {
        propertyName: 'clazz',
        columnName: '班级',
        type: '',
        width: 150,
        option: new ColumnOption()
      }
    ]
  autoHeight: number = 0
  constructor() { }
  ngOnInit(): void {
  }
  timer: any = undefined
  @ViewChild('wrapRef')
  wrapRef!: ElementRef
  @HostListener('window:resize')
  windowResize() {
      clearTimeout(this.timer)
      this.timer = undefined
      this.timer = setTimeout(() => {
        const height = this.wrapRef.nativeElement.clientHeight
        this.autoHeight = height > 500 ? height : 500  
      }, 200)
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autoHeight = this.wrapRef.nativeElement.clientHeight 
    }); 
  }
} 
