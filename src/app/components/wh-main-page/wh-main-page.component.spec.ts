import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhMainPageComponent } from './wh-main-page.component';

describe('WhMainPageComponent', () => {
  let component: WhMainPageComponent;
  let fixture: ComponentFixture<WhMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
