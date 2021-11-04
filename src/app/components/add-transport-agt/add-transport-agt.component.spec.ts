import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportAgtComponent } from './add-transport-agt.component';

describe('AddTransportAgtComponent', () => {
  let component: AddTransportAgtComponent;
  let fixture: ComponentFixture<AddTransportAgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransportAgtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransportAgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
