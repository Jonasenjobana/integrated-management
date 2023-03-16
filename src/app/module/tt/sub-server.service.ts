import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SubServerService {
  currentSelect: any
  $sub: Subject<any> = new Subject()
  $radius: Subject<any> = new Subject()
  $track: BehaviorSubject<any> = new BehaviorSubject(false)
  constructor() { 
  }
  setSelect(select: any) {
    this.currentSelect = select
  }
  get select() {
    return this.currentSelect
  }
  clickSub(data: any) {
    this.$sub.next(data)
  }
  subscribeId(cb: (res: any) => any) {
    this.$sub.subscribe(cb)
  }
  radiusTrigger(radius: number) {
    this.$radius.next(radius)
  }
  radiusSub(cb: (res:any) => any) {
    this.$radius.subscribe(cb)
  }

  showPopup() {
    this.$track.next(true)
  } 

  subTrack(cb: (res:any) => any) {
    this.$track.subscribe(cb)
  }
}
