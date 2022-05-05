import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisteredDetailComponent } from './company-registered-detail.component';

describe('CompanyRegisteredDetailComponent', () => {
  let component: CompanyRegisteredDetailComponent;
  let fixture: ComponentFixture<CompanyRegisteredDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegisteredDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisteredDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
