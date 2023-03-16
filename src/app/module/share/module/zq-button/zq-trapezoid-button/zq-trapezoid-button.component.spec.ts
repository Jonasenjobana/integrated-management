import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZqTrapezoidButtonComponent } from './zq-trapezoid-button.component';

describe('ZqTrapezoidButtonComponent', () => {
  let component: ZqTrapezoidButtonComponent;
  let fixture: ComponentFixture<ZqTrapezoidButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZqTrapezoidButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZqTrapezoidButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
