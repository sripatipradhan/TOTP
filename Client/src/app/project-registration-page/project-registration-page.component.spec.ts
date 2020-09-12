import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRegistrationPageComponent } from './project-registration-page.component';

describe('ProjectRegistrationPageComponent', () => {
  let component: ProjectRegistrationPageComponent;
  let fixture: ComponentFixture<ProjectRegistrationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRegistrationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
