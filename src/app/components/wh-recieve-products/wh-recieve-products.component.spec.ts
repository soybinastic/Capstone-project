import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhRecieveProductsComponent } from './wh-recieve-products.component';

describe('WhRecieveProductsComponent', () => {
  let component: WhRecieveProductsComponent;
  let fixture: ComponentFixture<WhRecieveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhRecieveProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhRecieveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
