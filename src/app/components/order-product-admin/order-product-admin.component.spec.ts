import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductAdminComponent } from './order-product-admin.component';

describe('OrderProductAdminComponent', () => {
  let component: OrderProductAdminComponent;
  let fixture: ComponentFixture<OrderProductAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
