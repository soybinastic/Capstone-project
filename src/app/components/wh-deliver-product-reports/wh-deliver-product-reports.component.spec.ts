import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhDeliverProductReportsComponent } from './wh-deliver-product-reports.component';

describe('WhDeliverProductReportsComponent', () => {
  let component: WhDeliverProductReportsComponent;
  let fixture: ComponentFixture<WhDeliverProductReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhDeliverProductReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhDeliverProductReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
