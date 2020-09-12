import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyauditlistComponent } from './companyauditlist.component';

describe('CompanyauditlistComponent', () => {
  let component: CompanyauditlistComponent;
  let fixture: ComponentFixture<CompanyauditlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyauditlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyauditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
