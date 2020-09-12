import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyerrorlistComponent } from './companyerrorlist.component';

describe('CompanyerrorlistComponent', () => {
  let component: CompanyerrorlistComponent;
  let fixture: ComponentFixture<CompanyerrorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyerrorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyerrorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
