import { Page } from './../share/model/result.model';
import { Component, OnInit, ViewChild, ViewContainerRef, Renderer2, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery'
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent implements OnInit {
  progress: number = 0
  interval?: NodeJS.Timer = undefined
  constructor(private ngZone: NgZone) {
  }

    ngOnInit(): void {
      // this.ngZone.runOutsideAngular(this.increaseProgress)
      let worker = new Worker(new URL('./render-params.worker', import.meta.url))
      worker.postMessage('')
      worker.onmessage =({data}) => {
        console.log('获取到数据',data);
      }
      setTimeout(() => {
        console.log('停止');
        worker.terminate()
        worker.postMessage('')
      }, 20000);
    }
    ngAfterViewInit() {

    }
    increaseProgress = () => {
      this.interval = setInterval(() => {
        if (this.progress === 100) {
          clearInterval(this.interval)
          this.ngZone.run(() => {this.progress = 100})
        }
        this.progress++
        console.log(this.progress,'progress'); 
      },200)
    }
    ngOnDestroy() {
      clearInterval(this.interval)
    }
}
