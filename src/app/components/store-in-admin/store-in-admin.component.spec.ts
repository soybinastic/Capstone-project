import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInAdminComponent } from './store-in-admin.component';

describe('StoreInAdminComponent', () => {
  let component: StoreInAdminComponent;
  let fixture: ComponentFixture<StoreInAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
