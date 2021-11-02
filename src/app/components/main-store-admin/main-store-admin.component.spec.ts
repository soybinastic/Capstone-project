import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoreAdminComponent } from './main-store-admin.component';

describe('MainStoreAdminComponent', () => {
  let component: MainStoreAdminComponent;
  let fixture: ComponentFixture<MainStoreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainStoreAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStoreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
