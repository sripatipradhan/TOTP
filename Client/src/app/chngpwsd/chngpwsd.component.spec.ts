import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChngpwsdComponent } from './chngpwsd.component';

describe('ChngpwsdComponent', () => {
  let component: ChngpwsdComponent;
  let fixture: ComponentFixture<ChngpwsdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChngpwsdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChngpwsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
