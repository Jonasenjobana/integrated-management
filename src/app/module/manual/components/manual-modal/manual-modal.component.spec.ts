import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualModalComponent } from './manual-modal.component';

describe('ManualModalComponent', () => {
  let component: ManualModalComponent;
  let fixture: ComponentFixture<ManualModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
