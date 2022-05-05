import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhProductCategoriesComponent } from './wh-product-categories.component';

describe('WhProductCategoriesComponent', () => {
  let component: WhProductCategoriesComponent;
  let fixture: ComponentFixture<WhProductCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhProductCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
