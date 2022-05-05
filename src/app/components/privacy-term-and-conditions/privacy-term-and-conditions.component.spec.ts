import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTermAndConditionsComponent } from './privacy-term-and-conditions.component';

describe('PrivacyTermAndConditionsComponent', () => {
  let component: PrivacyTermAndConditionsComponent;
  let fixture: ComponentFixture<PrivacyTermAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyTermAndConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyTermAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
