import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareStoresComponent } from './hardware-stores.component';

describe('HardwareStoresComponent', () => {
  let component: HardwareStoresComponent;
  let fixture: ComponentFixture<HardwareStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
