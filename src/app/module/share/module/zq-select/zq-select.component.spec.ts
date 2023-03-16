import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZqSelectComponent } from './zq-select.component';

describe('ZqSelectComponent', () => {
  let component: ZqSelectComponent;
  let fixture: ComponentFixture<ZqSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZqSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZqSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
