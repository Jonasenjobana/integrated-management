import { Injectable, RendererFactory2 } from '@angular/core';
import { StyleObjectLike } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ZqSpinService {
  private mask?: HTMLElement
  private spinContainer?: HTMLElement
  constructor(private factory: RendererFactory2) { }
  show(text?: string) {
    const render = this.factory.createRenderer(null, null)
    this.spinContainer = render.createElement('div')
    const styleObject = {
      position: 'absolute',
      top: '50%', width: '100%', 'text-align': 'center', left: '0', 'margin-top': '-25px', height: '50px', 'z-index': '1001' ,
      background_color: 'black'
    }
    this.spinContainer!.innerHTML = `<div>
        <div>加载中...</div>
      </div>`;
    this._setStyle(this.spinContainer!, styleObject)
    render.appendChild(document.body, this.spinContainer)
    console.log('service');
    
  }
  private _setStyle(el: HTMLElement, styleObj: StyleObjectLike) {
    for (let pro in styleObj) {
      const tmp: any = pro
      el.style[tmp] = styleObj[pro]
    }
  }
}
