import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoveProductsComponent } from './list-move-products.component';

describe('ListMoveProductsComponent', () => {
  let component: ListMoveProductsComponent;
  let fixture: ComponentFixture<ListMoveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMoveProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
