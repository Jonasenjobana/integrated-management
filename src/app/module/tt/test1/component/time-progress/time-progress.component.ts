import { concatAll, tap } from 'rxjs/operators';
import { SubServerService } from './../../../sub-server.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { fromEvent, map, takeUntil } from 'rxjs';
@Component({
  selector: 'app-time-progress',
  templateUrl: './time-progress.component.html',
  styleUrls: ['./time-progress.component.less'],
})
export class TimeProgressComponent implements OnInit {
  dragLeft: number = 0;
  dragDom!: HTMLElement;
  maxLeft = 450;
  offsetX = -5;
  constructor(private sub: SubServerService, private el: ElementRef) {}

  ngOnInit(): void {}
  //
  ngAfterViewInit() {
    this.dragDom = this.el.nativeElement.querySelector('#drag');
    let range = this.el.nativeElement.querySelector('.time-axe');
    let body = document.body;
    let down = fromEvent(this.dragDom, 'mousedown');
    let move = fromEvent(body, 'mousemove');
    let up = fromEvent(body, 'mouseup');
    let click = fromEvent(range, 'click')
    down.pipe(

      map((event) => {

        return move.pipe(takeUntil(up), takeUntil(click))
      }),
      concatAll(),
    ).subscribe((event: any) => {
      if (this.dragLeft >= 0 && this.dragLeft + event.movementX <= this.maxLeft) {
        this.dragLeft += event.movementX
      }
      if (this.dragLeft < 0) {
        this.dragLeft = 0
      }
      if (this.dragLeft > 450) {
        this.dragLeft = 450
      }
    });
    click.subscribe((e: any) => {
      this.dragLeft = e.offsetX
    })
  }
  back() {
    this.sub.showPopup();
  }
}
