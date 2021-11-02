import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategAdminComponent } from './add-categ-admin.component';

describe('AddCategAdminComponent', () => {
  let component: AddCategAdminComponent;
  let fixture: ComponentFixture<AddCategAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
