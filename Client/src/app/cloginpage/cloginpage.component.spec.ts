import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloginpageComponent } from './cloginpage.component';

describe('CloginpageComponent', () => {
  let component: CloginpageComponent;
  let fixture: ComponentFixture<CloginpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloginpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
