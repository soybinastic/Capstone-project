import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhAddRecievedProductsComponent } from './wh-add-recieved-products.component';

describe('WhAddRecievedProductsComponent', () => {
  let component: WhAddRecievedProductsComponent;
  let fixture: ComponentFixture<WhAddRecievedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhAddRecievedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhAddRecievedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
