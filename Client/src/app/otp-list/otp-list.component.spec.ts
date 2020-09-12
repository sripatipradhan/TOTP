import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpListComponent } from './otp-list.component';

describe('OtpListComponent', () => {
  let component: OtpListComponent;
  let fixture: ComponentFixture<OtpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
