import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMasterListComponent } from './project-master-list.component';

describe('ProjectMasterListComponent', () => {
  let component: ProjectMasterListComponent;
  let fixture: ComponentFixture<ProjectMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
