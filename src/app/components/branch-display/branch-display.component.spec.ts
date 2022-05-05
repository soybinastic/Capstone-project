import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDisplayComponent } from './branch-display.component';

describe('BranchDisplayComponent', () => {
  let component: BranchDisplayComponent;
  let fixture: ComponentFixture<BranchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
