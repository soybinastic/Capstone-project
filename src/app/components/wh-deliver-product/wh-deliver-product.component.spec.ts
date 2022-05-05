import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhDeliverProductComponent } from './wh-deliver-product.component';

describe('WhDeliverProductComponent', () => {
  let component: WhDeliverProductComponent;
  let fixture: ComponentFixture<WhDeliverProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhDeliverProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhDeliverProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
