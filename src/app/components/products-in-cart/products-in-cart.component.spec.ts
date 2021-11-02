import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInCartComponent } from './products-in-cart.component';

describe('ProductsInCartComponent', () => {
  let component: ProductsInCartComponent;
  let fixture: ComponentFixture<ProductsInCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsInCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
