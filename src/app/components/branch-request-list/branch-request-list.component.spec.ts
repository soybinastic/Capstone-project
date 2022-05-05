import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchRequestListComponent } from './branch-request-list.component';

describe('BranchRequestListComponent', () => {
  let component: BranchRequestListComponent;
  let fixture: ComponentFixture<BranchRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
