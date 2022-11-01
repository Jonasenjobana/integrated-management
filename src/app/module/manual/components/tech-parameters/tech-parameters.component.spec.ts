import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechParametersComponent } from './tech-parameters.component';

describe('TechParametersComponent', () => {
  let component: TechParametersComponent;
  let fixture: ComponentFixture<TechParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
