import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZqOptionComponent } from './zq-option.component';

describe('ZqOptionComponent', () => {
  let component: ZqOptionComponent;
  let fixture: ComponentFixture<ZqOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZqOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZqOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
