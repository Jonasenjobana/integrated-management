import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIntroductionComponent } from './common-introduction.component';

describe('CommonIntroductionComponent', () => {
  let component: CommonIntroductionComponent;
  let fixture: ComponentFixture<CommonIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonIntroductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
