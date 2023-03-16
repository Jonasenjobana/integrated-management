import { Component, OnInit, ElementRef, Renderer2, Input, ViewChild, HostListener, Output, EventEmitter, ChangeDetectorRef, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';

@Component({
  selector: '[sl-radio]',
  templateUrl: './zq-radio-tpl.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioTplComponent),
      multi: true
    }
  ],
})
export class RadioTplComponent implements OnInit, ControlValueAccessor {
  name: string = '';
  isMultiple: boolean = false; // 是否支持多选
  @Input() isCanCancel!: boolean;
  @Input() isSelected!: boolean;
  @Input() isDisabled!: boolean;
  @Input() slValue: any;
  onChange: OnChangeType = () => null;
  onTouched: OnTouchedType = () => null;
  @ViewChild('inputElement', { static: false }) inputElement!: ElementRef;
  select$ = new Subject<RadioTplComponent>();
  touched$ = new Subject<void>();
  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'sl-radio-wrapper');
  }
  ngOnInit() {
  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // 停止冒泡
    event.stopPropagation();
    // 停止默认事件
    event.preventDefault();
    if (!this.isDisabled && !this.isSelected) {
      this.select$.next(this);
      this.isSelected = true;
      this.onChange(true);
    } else if (!this.isDisabled && this.isSelected && this.isCanCancel) {
      this.select$.next(this);
      this.isSelected = false;
      this.onChange(false);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
  writeValue(value: any): void {
    this.isSelected = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
