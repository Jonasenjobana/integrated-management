import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZqFilterComponent } from './zq-filter.component';

describe('ZqFilterComponent', () => {
  let component: ZqFilterComponent;
  let fixture: ComponentFixture<ZqFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZqFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZqFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
