import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRefComponent } from './order-ref.component';

describe('OrderRefComponent', () => {
  let component: OrderRefComponent;
  let fixture: ComponentFixture<OrderRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
