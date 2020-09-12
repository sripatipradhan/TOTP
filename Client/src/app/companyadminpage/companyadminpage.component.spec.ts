import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyadminpageComponent } from './companyadminpage.component';

describe('CompanyadminpageComponent', () => {
  let component: CompanyadminpageComponent;
  let fixture: ComponentFixture<CompanyadminpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyadminpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyadminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
