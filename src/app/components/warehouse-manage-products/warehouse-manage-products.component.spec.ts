import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManageProductsComponent } from './warehouse-manage-products.component';

describe('WarehouseManageProductsComponent', () => {
  let component: WarehouseManageProductsComponent;
  let fixture: ComponentFixture<WarehouseManageProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseManageProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
