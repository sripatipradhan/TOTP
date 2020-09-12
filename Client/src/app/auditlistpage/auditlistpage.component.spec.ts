import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlistpageComponent } from './auditlistpage.component';

describe('AuditlistpageComponent', () => {
  let component: AuditlistpageComponent;
  let fixture: ComponentFixture<AuditlistpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditlistpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditlistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
