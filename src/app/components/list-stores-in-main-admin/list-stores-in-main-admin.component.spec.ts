import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStoresInMainAdminComponent } from './list-stores-in-main-admin.component';

describe('ListStoresInMainAdminComponent', () => {
  let component: ListStoresInMainAdminComponent;
  let fixture: ComponentFixture<ListStoresInMainAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStoresInMainAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStoresInMainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
