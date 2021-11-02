import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsAdminComponent } from './order-products-admin.component';

describe('OrderProductsAdminComponent', () => {
  let component: OrderProductsAdminComponent;
  let fixture: ComponentFixture<OrderProductsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
