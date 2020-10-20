import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoShoppingCartComponent } from './no-shopping-cart.component';

describe('NoShoppingCartComponent', () => {
  let component: NoShoppingCartComponent;
  let fixture: ComponentFixture<NoShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
