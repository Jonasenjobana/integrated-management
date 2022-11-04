import { Component, OnInit } from '@angular/core';
import { DynamicServeService } from '../../dynamic-serve.service';
import { Menu, MenuList } from './Menu';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SideBarComponent implements OnInit {

  constructor(private dynamicServe: DynamicServeService) {
    this.menuList = MenuList;
  }
  ngOnInit(): void {}
  menuList: Menu[];
  showContent(componentName: string): void {
    this.dynamicServe.addTab(componentName, { type: ''}, true);
  }
}
