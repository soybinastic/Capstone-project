import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhAvailableProductsComponent } from './wh-available-products.component';

describe('WhAvailableProductsComponent', () => {
  let component: WhAvailableProductsComponent;
  let fixture: ComponentFixture<WhAvailableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhAvailableProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhAvailableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
