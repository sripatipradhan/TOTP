import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretecodevalidComponent } from './secretecodevalid.component';

describe('SecretecodevalidComponent', () => {
  let component: SecretecodevalidComponent;
  let fixture: ComponentFixture<SecretecodevalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretecodevalidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretecodevalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
