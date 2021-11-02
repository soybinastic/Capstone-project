import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedOrderAdminComponent } from './modified-order-admin.component';

describe('ModifiedOrderAdminComponent', () => {
  let component: ModifiedOrderAdminComponent;
  let fixture: ComponentFixture<ModifiedOrderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiedOrderAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
