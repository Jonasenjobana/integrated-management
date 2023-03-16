import { Overlay } from '@angular/cdk/overlay';
import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
import { SubServerService } from '../sub-server.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.less']
})
export class Test1Component implements OnInit {
  nav: number = 1
  @Input() isShow: boolean = true
  @Input() popup!: L.Popup
  @Input() map!: L.Map
  @Input() id?: string = ''
  overlayRef: any = undefined
  @ViewChild(CdkPortal, { static: false }) templateCDKPortal!: TemplatePortal<any>;
  constructor(private sub:SubServerService, public overlay: Overlay) {
    this.sub.subTrack((res) => {
      if (res && this.overlayRef) {
        this.popup.addTo(this.map)
        this.overlayRef.dispose()
      }
    })
  }

  ngOnInit(): void {
  }
  init() {
    this.nav = 2
  }
  ngOnChanges(changes: SimpleChanges) {
    this.init()
  }
  playTrack(e: boolean) {
    if (e) {
      this.popup.remove()
      this.onHistoryChange()
    }
  }
  onHistoryChange() {
    console.log(this.overlayRef)
    this.overlayRef && this.overlayRef.detach() && this.overlayRef.attach(this.templateCDKPortal) || this.createTime()
  }
   /**创建时间轴 */
   private createTime() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .height("50px")
      .centerHorizontally()
      .bottom("50px");
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: 200,
      minHeight: 50,
      hasBackdrop: false,
    });
    this.overlayRef.attach(this.templateCDKPortal);
  }
}
