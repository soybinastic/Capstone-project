import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhProductStatusInfoComponent } from './wh-product-status-info.component';

describe('WhProductStatusInfoComponent', () => {
  let component: WhProductStatusInfoComponent;
  let fixture: ComponentFixture<WhProductStatusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhProductStatusInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhProductStatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
