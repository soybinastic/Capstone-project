import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisteredListComponent } from './company-registered-list.component';

describe('CompanyRegisteredListComponent', () => {
  let component: CompanyRegisteredListComponent;
  let fixture: ComponentFixture<CompanyRegisteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegisteredListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
