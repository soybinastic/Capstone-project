import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhProductInfoComponent } from './wh-product-info.component';

describe('WhProductInfoComponent', () => {
  let component: WhProductInfoComponent;
  let fixture: ComponentFixture<WhProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhProductInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
