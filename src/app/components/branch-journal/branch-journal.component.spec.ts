import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchJournalComponent } from './branch-journal.component';

describe('BranchJournalComponent', () => {
  let component: BranchJournalComponent;
  let fixture: ComponentFixture<BranchJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
