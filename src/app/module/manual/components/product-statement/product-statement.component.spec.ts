import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatementComponent } from './product-statement.component';

describe('ProductStatementComponent', () => {
  let component: ProductStatementComponent;
  let fixture: ComponentFixture<ProductStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
