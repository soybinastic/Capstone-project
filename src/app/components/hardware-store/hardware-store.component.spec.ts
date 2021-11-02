import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareStoreComponent } from './hardware-store.component';

describe('HardwareStoreComponent', () => {
  let component: HardwareStoreComponent;
  let fixture: ComponentFixture<HardwareStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
