import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhBestsellingProductReportsComponent } from './wh-bestselling-product-reports.component';

describe('WhBestsellingProductReportsComponent', () => {
  let component: WhBestsellingProductReportsComponent;
  let fixture: ComponentFixture<WhBestsellingProductReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhBestsellingProductReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhBestsellingProductReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
