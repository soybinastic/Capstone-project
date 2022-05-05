import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhProductListComponent } from './wh-product-list.component';

describe('WhProductListComponent', () => {
  let component: WhProductListComponent;
  let fixture: ComponentFixture<WhProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
