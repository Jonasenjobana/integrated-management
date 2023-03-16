import { SubServerService } from './../sub-server.service';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.less']
})
export class RadiusComponent implements OnInit {
  radius: number = 500
  @ViewChild('inputRef', {static: false}) inputRef!: ElementRef<HTMLInputElement>
  @Output() play: EventEmitter<any> = new EventEmitter()
  @Input() id?: string = '' 
  constructor(private sub: SubServerService) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && changes['id'].currentValue !== '') {
      this.init()
      this.sub.radiusTrigger(this.radius)
    }
  }
  init() {
    this.radius = 500
  }
  changeRadius() {
    let r = this.radius
    this.inputRef.nativeElement.className = ''
    if (!Number.isNaN(r)&& r > 0) {
      this.sub.radiusTrigger(r)
    } else {
      this.inputRef.nativeElement.className = 'red-border'
    }
  }
  playTrack() {
    this.play.emit(true)
  }
}
