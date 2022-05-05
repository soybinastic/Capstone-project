import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRegistrationFormComponent } from './store-registration-form.component';

describe('StoreRegistrationFormComponent', () => {
  let component: StoreRegistrationFormComponent;
  let fixture: ComponentFixture<StoreRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
