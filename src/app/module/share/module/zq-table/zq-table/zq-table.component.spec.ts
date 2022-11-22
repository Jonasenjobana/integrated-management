import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZqTableComponent } from './zq-table.component';

describe('ZqTableComponent', () => {
  let component: ZqTableComponent;
  let fixture: ComponentFixture<ZqTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZqTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZqTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
