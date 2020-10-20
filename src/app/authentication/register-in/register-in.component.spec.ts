import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInComponent } from './register-in.component';

describe('RegisterInComponent', () => {
  let component: RegisterInComponent;
  let fixture: ComponentFixture<RegisterInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
