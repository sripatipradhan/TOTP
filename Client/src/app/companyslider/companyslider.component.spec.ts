import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysliderComponent } from './companyslider.component';

describe('CompanysliderComponent', () => {
  let component: CompanysliderComponent;
  let fixture: ComponentFixture<CompanysliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
