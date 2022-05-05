import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhAddProductComponent } from './wh-add-product.component';

describe('WhAddProductComponent', () => {
  let component: WhAddProductComponent;
  let fixture: ComponentFixture<WhAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhAddProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
